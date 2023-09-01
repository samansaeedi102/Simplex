import { assert, boolean, Infer, object, optional } from "superstruct";
import { APIError, STATUS_CODES } from '../../../../../utils/src/lib/error/appErr';
import { objectIdValidation } from "../../../utils/validation";
import { UserModel } from "../../models/User";

const GetUserStruct = object({
    _id: objectIdValidation,
    kids: optional(boolean()),
    kidAvatar: optional(boolean()),
    province: optional(boolean()),
    city: optional(boolean()),
    allElixir: optional(boolean()),
    avatar: optional(boolean()),
  });

  export type GetUserInp = Infer<typeof GetUserStruct>;

  export const getUserRepo = async (getUserRepoInp: GetUserInp) => {
    try {
      assert(getUserRepoInp, GetUserStruct);
  
      const { _id, kids, province, city, allElixir, avatar, kidAvatar } =
        getUserRepoInp;
  
      const foundUser = UserModel.findById(_id);
  
      kids && foundUser.populate("kids");
      province && foundUser.populate("province");
      city && foundUser.populate("city");
      allElixir && foundUser.populate("allElixir");
      avatar && foundUser.populate("avatar");
      kidAvatar && foundUser.populate({
        path: "kids",
        populate: {
          path: "avatar",
        },
      });
  
      return await foundUser.exec();
    } catch (err) {
      throw new APIError(
        "API Error",
        (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
        (err as APIError).description || err.message ||
          "Unable to found any user",
      );
    }
  };
  
