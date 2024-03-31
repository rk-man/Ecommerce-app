import { type NextApiRequest, type NextApiResponse } from "next";
import { createCaller } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import { protect } from "@/helpers/validation";

const chooseHanlder = async (req: NextApiRequest, res: NextApiResponse) => {
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
    let id = protect(req, res);

    const user = await caller.user.getByUserID({
      id: id,
    });

    if (!user)
      return res.status(400).json({
        status: "fail",
        message: "The account has been deleted",
      });

    let data = await caller.category.create_category_user({
      category_id: req.body.category_id,
      user_id: user.id,
    });

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong",
    });
  }

  res.status(500).json({ message: "Internal server error" });
};

export default chooseHanlder;
