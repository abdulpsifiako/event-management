import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString} from "class-validator";
import { Role } from "./register.model";

export enum Gender{
    Men='Men',
    Woman='Woman',
    Custom='Custom'
}

export class UserId{
    id?:string
}
export class Users extends UserId{

    @ApiProperty()
    @IsString()
    name :string;

    email :string;
    
    @ApiProperty()
    phone :string;

    // @ApiProperty()
    // @Matches(/^[a-zA-Z0-9]+$/, {message:'username must combination string and number'})
    username :string;
    
    @ApiProperty({ enum: Gender, enumName: 'Gender' })
    @IsEnum(Gender)
    gender:string;

    @ApiProperty()
    @IsString()
    profession:string

    @ApiProperty()
    @IsString()
    nationality:string;
    
    @ApiProperty()
    @IsString()
    dateofbirth:string

    image:string;

    verivied:boolean;
    
    role :string;
}

export class LoginResponse extends UserId{
    token:string
}
