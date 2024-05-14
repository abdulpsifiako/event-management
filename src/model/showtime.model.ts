import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsString, Matches } from "class-validator";

export class ShowTimes{
    @ApiProperty()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
      message: 'time must be in the format HH:MM:SS',
    })
    time:string
}