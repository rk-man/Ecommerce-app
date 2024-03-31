import { type NextApiRequest, type NextApiResponse } from "next";
import cookie from "cookie";

const logoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        maxAge: 0,
        httpOnly: true,
        path: "/",
      }),
    );

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "fail",
      message: "Couldn't logout. Something went wrong",
    });
  }

  res.status(500).json({ message: "Internal server error" });
};

export default logoutHandler;
