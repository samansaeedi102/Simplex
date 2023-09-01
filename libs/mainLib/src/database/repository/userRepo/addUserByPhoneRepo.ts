import { APIError, STATUS_CODES } from  "../../../../../utils/src/lib/error/appErr";
import { assert, Infer, object } from 'superstruct';
import { phoneValidation } from '../../../utils/validation';
import { UserModel } from "../../models/User"

const AddUserByPhoneStruct = object({
  phone: phoneValidation,
});

export type AddUserByPhoneInp = Infer<typeof AddUserByPhoneStruct>;

export const addUserByPhoneRepo = async (
  addUserByPhoneRepoInp: AddUserByPhoneInp
) => {
  try {
    const phoneNum = Number(addUserByPhoneRepoInp.phone);
    assert({ phone: phoneNum }, AddUserByPhoneStruct);
    const newUserByPhone = new UserModel({ phone: phoneNum });
    return await newUserByPhone.save();
  } catch (err) {
    throw new APIError(
      'API Error',
      (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
      (err as APIError).description ||
        err.message ||
        'Unable to save new UserByPhone'
    );
  }
};
