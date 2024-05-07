import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum,Matches} from 'class-validator';

export enum Role {
  Customer = 'Customer',
  EO = 'EO', // Event Organizer
  VM = 'VM', // Venue Management
  Organization='Organization' // sebuah organisasi contohnya band, golongan yang punya label 
}

export class RegisterRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, { message: 'The password must contain at least one lowercase letter, one uppercase letter, one number, and one character/symbol.' })
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  @IsEnum(Role)
  role: Role;
}

export class LoginUser{
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;
}
