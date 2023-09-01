import { Infer, number, object, size, string } from "superstruct";
import { getUserByPhoneRepo } from "../../database/repository/userRepo/getUserByPhoneRepo";
import { APIError, STATUS_CODES } from '../../../../utils/src/lib/error/appErr';
import { formatData } from "../../../../utils/src/lib/format/formatData";
import { generateSignature } from "../../../../utils/src/lib/encrypt/generateSignature"
import { throwErr } from "../../../../utils/src/lib/error/throw";
const LoginStruct = object({
    phone: size(number(), 10),
    code: size(string(), 6),
  });

  export type LoginServiceInp = Infer<typeof LoginStruct>;

export interface LogInServiceInput {
  // channel: ampqlib.Channel;
  inputs: LoginServiceInp;
  redisConnections: any;
};

export const logInService = async (inputs: LogInServiceInput) => {
    const { phone, code } = inputs.inputs;
  
    try {
      // TODO : should check several circonstans and send proper error
      const codePhone = await inputs.redisConnections.get(phone);
      console.log(codePhone, code)
      const sendToken = async () => {
        const foundUser = await getUserByPhoneRepo({ phone });
  
        !foundUser &&
          throwErr(
            "can not find this user by this phone number",
            STATUS_CODES.NOT_FOUND,
          );
  
        const token = generateSignature(
          JSON.stringify({
            _id: foundUser!._id,
            phone: foundUser!.phone,
          }),
        );
  
        return formatData({ user: foundUser, token });
      };
  
      return codePhone === code
        ? await sendToken()
        : throwErr("Your code is not correct", STATUS_CODES.BAD_REQUEST);
    } catch (err) {
      throw new APIError(
        "APIERROR",
        STATUS_CODES.UN_AUTHORISED,
        (err as APIError).description || "Can not login",
      );
    }
  };
  