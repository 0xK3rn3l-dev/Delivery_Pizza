import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET || '629d9497caa18383dd1a4680df4a0154cdc2bdc9f12e945077d6a201175ba99a',
};