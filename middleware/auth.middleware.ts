import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/env.config';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!ACCESS_TOKEN_SECRET) {
      throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;

    if (typeof decoded.aud !== 'string') {
      throw new Error("Invalid token audience");
    }

    req.userId = decoded.aud;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default auth;