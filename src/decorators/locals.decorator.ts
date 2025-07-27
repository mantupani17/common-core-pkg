import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Locals = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    if (!key) return response.locals;
    return response.locals?.[key];
  },
);