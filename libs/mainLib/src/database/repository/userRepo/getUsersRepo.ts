import { APIError, STATUS_CODES } from '../../../../../utils/src/lib/error/appErr';
import { FilterQuery } from "mongoose";
import {
  assert,
  boolean,
  defaulted,
  enums,
  Infer,
  integer,
  object,
  optional,
  size,
  string,
} from "superstruct";
import { objectIdValidation } from "../../../utils/validation";
import { IUser, userGenderEnum, UserModel, userTypeEnum } from "../../models/User";

const GetUsersStruct = object({
  city: optional(boolean()),
  province: optional(boolean()),
  gender: optional(enums(userGenderEnum)),
  filterType: optional(enums(userTypeEnum)),
  filterCity: optional(objectIdValidation),
  filterProvince: optional(objectIdValidation),
  filterName: optional(string()),
  filterNumber: optional(string()),
//   page: defaulted(size(integer(), 1, Infinity), () => 1),
//   take: defaulted(size(integer(), 2, 60), () => 25),
});

export type GetUsersInp = Infer<typeof GetUsersStruct>;

export const getUsersRepo = async (getUsersRepoInp: GetUsersInp) => {
  try {
    assert(getUsersRepoInp, GetUsersStruct);
    const {
      city,
      province,
      gender,
      filterCity,
      filterType,
      filterProvince,
      filterName,
      filterNumber,
    //   page,
    //   take,
    } = getUsersRepoInp;
    let filter: FilterQuery<IUser> = {};
    filterCity && (filter.city = filterCity);
    filterProvince && (filter.province = filterProvince);
    gender && (filter.gender = gender);
    filterType && (filter.type = filterType);
    filterName &&
      (filter = {
        ...filter,
        $text: { $search: filterName },
      });
    filterNumber &&
      (filter = {
        ...filter,
        phone: { $regex: filterNumber },
      });

    const foundUsers = UserModel.find(filter).sort({ _id: "desc" });

    // foundUsers.skip((page - 1) * take);
    // foundUsers.limit(take);

    const total = await UserModel.count(filter).exec();
    const isLastPage = total 
    /// page < take ? true : false;

    city && foundUsers.populate("city");
    province && foundUsers.populate("province");

    return { data: await foundUsers.exec(), total, isLastPage };
  } catch (err) {
    throw new APIError(
      "API Error",
      (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
      (err as APIError).description || err.message ||
        "Unable to found any user",
    );
  }
};
