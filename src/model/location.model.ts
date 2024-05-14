import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class Locations{
    @ApiProperty()
    @MinLength(5)
    name:string;

    @ApiProperty()
    @MinLength(10)
    address:string

    @ApiProperty()
    @MinLength(10)
    description:string;
}