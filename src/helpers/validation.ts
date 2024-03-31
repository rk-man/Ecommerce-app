import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CustomRequest } from "@/utils/constants";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

let secretKey: string = process.env.AUTH_SECRET_KEY as string;

export function encryptToken(id: string) {
  return jwt.sign(
    {
      id,
    },
    secretKey,
    {
      expiresIn: 30 * 24 * 60 * 60 * 1000,
    },
  );
}

export function decryptToken(token: string): JwtPayload {
  return jwt.verify(token, secretKey) as JwtPayload;
}

export function encryptPassword(password: string) {
  let encryptedPassword = bcrypt.hashSync(password, 12);

  return encryptedPassword;
}

export function comparePassword(
  enteredPassword: string,
  storedPassword: string,
) {
  return bcrypt.compareSync(enteredPassword, storedPassword);
}

export function protect(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(
    req.headers ? (req.headers.cookie ? req.headers.cookie : "") : "",
  );

  const decoded: JwtPayload = decryptToken(cookies.token ? cookies.token : "");

  if (!decoded) {
    return res.status(400).json({
      status: "fail",
      message: "You are not authorized. Please log in to continue",
    });
  }

  return decoded.id;
}
