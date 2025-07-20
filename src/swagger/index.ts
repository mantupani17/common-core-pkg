import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from 'fs'
import { SwaggerConfigDto } from "./swagger-request.dto";

export class GenerateSwagger {
    /**
     * @description It will generate the swagger docs and json
     * @param app 
     */
    static generate(app: NestExpressApplication, cfg:SwaggerConfigDto){
        const config = new DocumentBuilder()
        .setTitle(cfg.title)
        .setDescription(cfg.description)
        .setVersion(cfg.version)
        .addServer(cfg.serverUrl, "Server Endpoint")
        .addBearerAuth() // Enables JWT token input
        .build()
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('spec', app, document); // Access at /api
        fs.writeFileSync('configs/swagger-output.json', JSON.stringify(document, null, 2));
    }

} 