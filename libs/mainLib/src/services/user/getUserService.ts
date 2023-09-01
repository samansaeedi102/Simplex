import { APIError, STATUS_CODES } from '../../../../utils/src/lib/error/appErr';
import { formatData } from '../../../../utils/src/lib/format/formatData';
import { GetUserInp, getUserRepo } from '../../database/repository/userRepo/getUserRepo';

export interface getUserServiceInp {
    // channel: ampqlib.Channel;
    // inputs: IMessagePayload<{ userId: string; shopId: string }>;
    redisConnections: any;
    inputs: GetUserInp;
};

export const getUserService = async (inputs: getUserServiceInp) => {
    try {
      const foundUser = await getUserRepo(inputs.inputs);
  
      if (foundUser === null) {
        throw new APIError(
          'API Error',
          STATUS_CODES.INTERNAL_ERROR,
          'Unable to found any user'
        );
      }
  
      return formatData({ user: foundUser });
    } catch (err) {
      throw new APIError(
        'API Error',
        (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
        (err as APIError).description || err.message || 'Unable to found any User'
      );
    }
  };
  