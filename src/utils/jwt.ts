import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;
if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

export const signToken = (payload: object) =>
  jwt.sign(payload, secret, { expiresIn: "1d" });

export const verifyToken = (token: string) => jwt.verify(token, secret);
