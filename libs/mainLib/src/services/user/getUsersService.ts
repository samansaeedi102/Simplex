import { APIError, STATUS_CODES } from '../../../../utils/src/lib/error/appErr';
import { formatData } from '../../../../utils/src/lib/format/formatData';
import { GetUsersInp, getUsersRepo } from '../../database/repository/userRepo/getUsersRepo';
export interface getUsersServiceInp {
  inputs: GetUsersInp;
}

export const getUsersService = async (inputs: getUsersServiceInp) => {
  try {
    const foundUsers = await getUsersRepo(inputs.inputs);

    if (foundUsers === null) {
      throw new APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to found any user'
      );
    }

    return formatData({ users: foundUsers });
  } catch (err) {
    throw new APIError(
      'API Error',
      (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
      (err as APIError).description ||
        err.message ||
        'Unable to found any Users'
    );
  }
};
