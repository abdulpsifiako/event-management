import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MinLength } from "class-validator";

export class Ticket{
    @ApiProperty()
    @IsString()
    @MinLength(3)
    name:string;

    @ApiProperty()
    @IsNumber()
    price:number;
}