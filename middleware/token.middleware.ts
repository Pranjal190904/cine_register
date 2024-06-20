import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/env.config';

interface TokenOptions {
  expiresIn: string;
  issuer: string;
  audience: string;
}

const Token = {
  signAccessToken: (id: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret: jwt.Secret = ACCESS_TOKEN_SECRET as string; 
      const options: TokenOptions = {
        expiresIn: "2h",
        issuer: "cine_csi",
        audience: id,
      };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
};

export default Token;
