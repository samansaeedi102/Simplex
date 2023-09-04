import { APIError, STATUS_CODES } from '../../../../../utils/src/lib/error/appErr';
import {
  array,
  assert,
  date,
  enums,
  Infer,
  object,
  optional,
  string,
} from "superstruct";
import { objectIdValidation } from "../../../utils/validation";
import {
  userGenderEnum,
  UserModel,
  UserType,
  userTypeEnum,
} from "../../models/User"
import { throwErr } from '../../../../../utils/src/lib/error/throw';

const UpdateUserStruct = object({
  _id: objectIdValidation,
  adminId: optional(objectIdValidation),
  name: string(),
  family: string(),
  defaultAvatar: string(),
  avatar: optional(objectIdValidation),
  email: optional(string()),
  birthday: optional(date()),
  type: optional(array(enums(userTypeEnum))),
  payload: optional(object()),
  gender: enums(userGenderEnum),
  province: objectIdValidation,
  city: objectIdValidation,
  address: string(),
});

export type UpdateUserInp = Infer<typeof UpdateUserStruct>;

export const updateUserRepo = async (updateUserRepoInp: UpdateUserInp) => {
  try {
    updateUserRepoInp.birthday &&
      (updateUserRepoInp.birthday = new Date(updateUserRepoInp.birthday));
    assert(updateUserRepoInp, UpdateUserStruct);
    const { _id, adminId, ...rest } = updateUserRepoInp;
    console.log(adminId);
    const checkIsAdmin = async (adminId: string) => {
      const foundAdmin = await UserModel.findById(adminId).exec();
      console.log(foundAdmin)
      return foundAdmin!.type.includes(UserType.Admin)
        ? true
        : throwErr("You are not able to do this", STATUS_CODES.UN_AUTHORISED);
    };

    adminId ? await checkIsAdmin(adminId) : delete rest.type;
    rest.birthday && (rest.birthday = new Date(rest.birthday));

    const updatedUser = UserModel.findOneAndUpdate(
      { _id },
      {
        $set: rest,
      },
      { new: true },
    ).exec();

    return await updatedUser;
  } catch (err) {
    throw new APIError(
      "API Error",
      (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
      (err as APIError).description || err.message || "Unable to update User",
    );
  }
};
