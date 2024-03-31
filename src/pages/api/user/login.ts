import { type NextApiRequest, type NextApiResponse } from "next";
import { createCaller } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import cookie from "cookie";
import { comparePassword } from "@/helpers/validation";
import { encryptToken } from "@/helpers/validation";

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
    const user = await caller.user.getByEmail_confidential({
      email: req.body.email,
    });

    // compare password and check user
    if (!user || !comparePassword(req.body.password, user.password)) {
      return res.status(400).json({
        status: "fail",
        message: "Email or Password is incorrect",
      });
    }

    const token = encryptToken(user.id);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
        path: "/",
      }),
    );

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "fail",
      message: "Couldn't login. Something went wrong",
    });
  }

  // res.status(500).json({ message: "Internal server error" });
};

export default loginHandler;
