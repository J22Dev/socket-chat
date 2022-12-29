import jwt from "jsonwebtoken";
import argon from "argon2";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../common/config";

export const hashString = (str: string) => argon.hash(str);
export const verifyHash = (hash: string, plain: string) =>
  argon.verify(hash, plain);

export type TokenPayload = {
  id: number;
} & Record<string, string | number>;
export type TokenType = "ACCESS" | "REFRESH";
const TOKEN_OPTIONS = {
  ACCESS: {
    expiresIn: "1hr",
    secret: JWT_ACCESS_SECRET,
  },
  REFRESH: {
    expiresIn: "7d",
    secret: JWT_REFRESH_SECRET,
  },
};
export const signToken = ({
  payload,
  type,
}: {
  payload: TokenPayload;
  type: TokenType;
}) => {
  const { secret, expiresIn } = TOKEN_OPTIONS[type];
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = ({
  token,
  type,
}: {
  token: string;
  type: TokenType;
}): Promise<TokenPayload | false> => {
  return new Promise((res, rej) => {
    jwt.verify(token, TOKEN_OPTIONS[type].secret, (err, decoded) => {
      if (err) rej(false);
      res(decoded as TokenPayload);
    });
  });
};
