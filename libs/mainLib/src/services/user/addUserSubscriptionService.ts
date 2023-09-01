import { APIError, STATUS_CODES } from "../../../../utils/src/lib/error/appErr";
import { formatData } from "../../../../utils/src/lib/format/formatData";
import { AddUserSubscriptionInp, addUserSubscriptionRepo } from "../../database/repository/userRepo/addUserSubscriptionRepo";


export interface addUserSubscriptionServiceInp {
    inputs: AddUserSubscriptionInp;
  }
  
  export const addUserSubscriptionService = async (
    inputs: addUserSubscriptionServiceInp
  ) => {
    try {
      const updatedUser = await addUserSubscriptionRepo(inputs.inputs);
  
      if (updatedUser === null) {
        throw new APIError(
          'API Error',
          STATUS_CODES.INTERNAL_ERROR,
          'Unable to found any user'
        );
      }
  
      return formatData({ user: updatedUser });
    } catch (err) {
      throw new APIError(
        'API Error',
        (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
        (err as APIError).description || err.message || 'Unable to found any User'
      );
    }
  };
  