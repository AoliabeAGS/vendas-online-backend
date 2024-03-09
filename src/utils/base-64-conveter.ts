import { LoginPayload } from '../auth/dtos/loginPayLoad.dto';

export const authorizationToLogoinPayLoad = (
  authorization: string,
): LoginPayload | undefined => {
  const authorizationArray = authorization.split('.');
  if (authorizationArray.length < 3 || !authorizationArray[1]) {
    return undefined;
  }
  return JSON.parse(
    Buffer.from(authorizationArray[1], 'base64').toString('ascii'),
  );
};
