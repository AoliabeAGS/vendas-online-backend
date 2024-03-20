import * as bcrypt from 'bcrypt';

export const createPasswordHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

export const validatePassword = async (
  password: string,
  passwordHashed: string,
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHashed);
};
