import { APIError, STATUS_CODES } from '../../../../utils/src/lib/error/appErr';
import { UpdateUserInp, updateUserRepo } from "../../database/repository/userRepo/updateUserRepo";
import { formatData } from "../../../../utils/src/lib/format/formatData";

export interface UpdateUserServiceInput {
  // channel: ampqlib.Channel;
  inputs: UpdateUserInp;
  redisConnections: any;
}

export const updateUserService = async (inputs: UpdateUserServiceInput) => {
  try {
    const updatedUser = await updateUserRepo(inputs.inputs);

    if (updatedUser === null) {
      throw new APIError(
        "APIError",
        STATUS_CODES.INTERNAL_ERROR,
        "can not update user",
      );
    }

    return formatData({ user: updatedUser });
  } catch (err) {
    throw new APIError(
      "APIError",
      STATUS_CODES.INTERNAL_ERROR,
      (err as APIError).description || "can not update user",
    );
  }
};
