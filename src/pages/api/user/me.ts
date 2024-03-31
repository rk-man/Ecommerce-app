import { type NextApiRequest, type NextApiResponse } from "next";
import { createCaller } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import cookie from "cookie";
import { comparePassword, decryptToken, protect } from "@/helpers/validation";
import { JwtPayload } from "jsonwebtoken";

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const id = protect(req, res);

    const user = await caller.user.getByUserID({
      id,
    });

    if (!user)
      return res.status(400).json({
        status: "fail",
        message: "The account has been deleted",
      });

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Couldn't login. Something went wrong",
    });
  }

  res.status(500).json({ message: "Internal server error" });
};

export default loginHandler;
