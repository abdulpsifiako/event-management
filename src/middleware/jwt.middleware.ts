// jwt.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { BaseResponse } from 'src/response/response';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private prisma: PrismaClient){}
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return this.sendUnauthorizedResponse(res, "Please login first");
        }
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7); 

            const checkHistory = await this.prisma.historyLogin.findFirst({
                where:{
                    token:token
                },
                select:{
                    isLogin:true
                },
                orderBy: {
                    id: 'desc',
                  },
            })
            
            if(!checkHistory.isLogin){
                return this.sendUnauthorizedResponse(res, "Please login first");
            }

            try {
              const decoded = jwt.verify(token, process.env.SECRET_KEY); 
              req['x-decodetoken'] = decoded;
            } catch (error) {
                return this.sendUnauthorizedResponse(res, "Please login first");
            }
          }
      
          next()
        }

        private sendUnauthorizedResponse(res: Response, message: string) {
            res.status(401).json(BaseResponse.unauthorizedResponse(message));
        }
}
