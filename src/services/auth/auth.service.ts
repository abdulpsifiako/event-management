import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2'
import { PrismaClient } from '@prisma/client';
import { LoginResponse, Users } from 'src/model/users.model';
import * as jwt from 'jsonwebtoken'
import { BaseResponse } from 'src/response/response';

@Injectable()
export class AuthService {
    constructor( private prisma:PrismaClient){}

    async create(payload):Promise<BaseResponse<Users>>{
        let user = await this.prisma.users.findFirst({
            where: {
                OR: [
                    { email: payload.email },
                    { username: payload.username }
                ]
            }
        })

        if(user){
            return BaseResponse.unauthorizedResponse("Username/email already used")
        }

        const hash = await argon2.hash(payload.password)

        let data = {
            name:payload.name,
            username: payload.username,
            password:hash,
            email:payload.email,
            role:payload.role
        }

        const result = await this.prisma.users.create({
            data:data
        })
        
        const mappedUser: Users = {
            id: result.id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            username: result.username,
            gender: result.gender,
            profession: result.profession,
            nationality: result.nationality,
            dateofbirth: result.dateofbirth ? result.dateofbirth.toString() : null,
            image: result.image,
            verivied: result.verivied,
            role: result.role
        }

        return BaseResponse.ok([mappedUser])
    }

    async login(payload):Promise<BaseResponse<LoginResponse>>{
        const check = await this.prisma.users.findFirst({
            where:{
                email:payload.email
            }
        })
        if(!check){
            return BaseResponse.notFoundResponse("Please register first")
        }

        
        const checkPw =await argon2.verify(check.password, payload.password)

        if(!checkPw){
            return BaseResponse.unauthorizedResponse("Wrong email or password")
        }

        const user:Users={
            id: check.id,
            name: check.name,
            email: check.email,
            phone: check.phone,
            username: check.username,
            gender: check.gender,
            profession: check.profession,
            nationality: check.nationality,
            dateofbirth: check.dateofbirth ? check.dateofbirth.toString() : null,
            image: check.image,
            verivied: check.verivied,
            role: check.role
        }

        const checkHistory= await this.prisma.historyLogin.findMany(
            {
                where:{
                    AND:[
                        {
                            userId:user.id
                        },
                        {
                            isLogin:true
                        }
                    ]
                }
            }
        )
        if(checkHistory){ await 
           await this.prisma.historyLogin.updateMany({
            where:{
                AND:[
                    {
                        userId:user.id
                    },
                    {
                        isLogin:true
                    }
                ]
            },
            data:{
                isLogin:false,
            }
           })
        }
        let token=jwt.sign(user, process.env.SECRET_KEY, {expiresIn:"1d"})
        const data :LoginResponse={
            id:user.id,
            token
        }
        await this.prisma.historyLogin.create({
            data:{
                userId:data.id,
                token
            }       
        })
        return BaseResponse.ok([data])
    }

    async logout(payload):Promise<BaseResponse<any>>{
        await this.prisma.historyLogin.updateMany({
            where:{
                AND:[
                    {
                        userId:payload.id
                    },
                    {
                        isLogin:true
                    }
                ]
            },
            data:{
                isLogin:false
            }
        })
        return BaseResponse.ok("Success Logout")
    }   
}
