import { WinstonModule } from "nest-winston";
import { winstonLoggerOptions } from ".";

export const appConfig = {
      logger: WinstonModule.createLogger(winstonLoggerOptions),
}