import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authorizationToLogoinPayLoad } from 'src/utils/base-64-conveter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayLoad = authorizationToLogoinPayLoad(authorization);
  return loginPayLoad?.id;
});
