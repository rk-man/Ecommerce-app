import { type NextApiRequest, type NextApiResponse } from "next";
import { createCaller } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import { NextResponse } from "next/server";
import cookie from "cookie";
import { encryptPassword, encryptToken } from "@/helpers/validation";
import { sendMail } from "@/helpers/email";

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = createTRPCContext({
    req,
    res,
    info: {
      isBatchCall: false,
      calls: [],
    },
  });
  const caller = createCaller(ctx);
  try {
    req.body.password = encryptPassword(req.body.password);

    const user = await caller.user.create(req.body);

    const token = encryptToken(user.data.id);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
        path: "/",
      }),
    );

    await sendMail(user.data.email, user.data.verificationCode);

    let data: {
      email: string;
      password: string | undefined;
      id: string;
      name: string;
      createdAt: Date;
      isVerified: boolean;
      verificationCode: string | undefined;
    } = {
      ...user.data,
    };

    data.password = undefined;
    data.verificationCode = undefined;

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err: any) {
    let message: string = err.message;

    if (message.includes("email")) {
      return res.status(400).json({
        status: "fail",
        message: "This email is already registered!",
      });
    }
    return res.status(400).json({
      status: "fail",
      message: "something went wrong",
    });
  }
  // Another error occurred

  res.status(500).json({ message: "Internal server error" });
};

export default registerHandler;
