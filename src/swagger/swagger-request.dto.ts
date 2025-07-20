import 'reflect-metadata';
import { IsString } from "class-validator";

export class SwaggerConfigDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    version: string;

    @IsString()
    serverUrl: string
}
 