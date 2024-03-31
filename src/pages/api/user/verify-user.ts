import { type NextApiRequest, type NextApiResponse } from "next";
import { createCaller } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import { NextResponse } from "next/server";
import cookie from "cookie";
import { encryptPassword, encryptToken, protect } from "@/helpers/validation";
import { sendMail } from "@/helpers/email";
import { CustomRequest } from "@/utils/constants";

const verifyUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    if (req.method !== "PATCH")
      return res.status(400).json({
        status: "fail",
        message: "Only PATCH request is allowed",
      });

    let current_user_id = protect(req, res);

    let user = await caller.user.getByUserID_Confidential({
      id: current_user_id,
    });

    if (!user)
      return res.status(400).json({
        status: "fail",
        message: "The account has been deleted",
      });

    if (req.body.verificationCode !== user.verificationCode)
      return res.status(400).json({
        status: "fail",
        message: "Your verification Code is incorrect. try again!",
      });

    let updated_user = await caller.user.updateIsVerified({
      isVerified: true,
      id: user.id,
    });

    res.status(200).json({
      status: "success",
      data: updated_user.data,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "fail",
      message: "something went wrong",
    });
  }
  // Another error occurred

  res.status(500).json({ message: "Internal server error" });
};

export default verifyUserHandler;
