import { assert, Infer, number, object, size } from 'superstruct';
import { APIError, STATUS_CODES } from '../../../../../utils/src/lib/error/appErr';
import { UserModel } from '../../models/User';

const GetUserByPhoneStruct = object({
    phone: size(number(),9000000000, 9499999999)
});

export type GetUserByPhoneInp = Infer<typeof GetUserByPhoneStruct>;

export const getUserByPhoneRepo = async (
    getUserByPhoneRepoInp: GetUserByPhoneInp
) => {
    try {
        const phoneNum = Number(getUserByPhoneRepoInp.phone);
        assert({phone: phoneNum}, GetUserByPhoneStruct);
        return await UserModel.findOne({phone: phoneNum}).exec();
    } catch (err) {
        throw new APIError(
            'API Error',
            (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
            (err as APIError).description || err.message || 'Unable to found any user'
        );
    }
}