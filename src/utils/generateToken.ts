import { sign, SignOptions } from 'jsonwebtoken';

export interface Ipayload {
  id: number;
}

export const TOKEN_SECRET = '97382689029b92c526a5a1fb0ed7e7f3';

const configToken: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export function generateToken(payload: Ipayload): string {
  try {
    const token = sign(payload, TOKEN_SECRET, {
      ...configToken,
      subject: payload.id.toString(),
    });
    return token;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
