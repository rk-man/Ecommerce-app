import { type NextApiRequest, type NextApiResponse } from "next";
import { createCaller } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import { protect } from "@/helpers/validation";

const getCategoriesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
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

    let data = await caller.category.get();

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
};

export default getCategoriesHandler;
