import { NextApiRequest } from "next";
export interface CustomRequest extends NextApiRequest {
  current_user_id: string;
}
