import 'reflect-metadata';
import { IsString } from "class-validator";

export class OpenTelemetryConfigDto {
    //  'http://localhost:4318/v1/traces'
    @IsString()
    traceUrl: string;

    @IsString()
    appName: string;

    @IsString()
    appVersion: string;

    @IsString()
    deplomentEnv: string;
}
