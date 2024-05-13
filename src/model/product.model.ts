import { ApiProperty } from "@nestjs/swagger";
import { Min, MinLength } from "class-validator";

export class Products{
    @ApiProperty()
    name:string;

    @ApiProperty()
    category:string;

    @ApiProperty()
    @MinLength(10)
    theme:string;

    @ApiProperty()
    @MinLength(200)
    description:string;
}