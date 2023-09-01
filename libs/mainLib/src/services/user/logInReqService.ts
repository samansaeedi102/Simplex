import { APIError, STATUS_CODES} from "../../../../utils/src/lib/error/appErr";
import { formatData } from "../../../../utils/src/lib/format/formatData";
import axios from "axios";
import {addUserByPhoneRepo,} from "../../database/repository/userRepo/addUserByPhoneRepo";
import {  GetUserByPhoneInp,getUserByPhoneRepo } from "../../database/repository/userRepo/getUserByPhoneRepo";
import { IUser } from "../../database/models/User"

export interface logInRequestServiceInput {
  // channel: ampqlib.Channel;
  inputs: GetUserByPhoneInp;
  redisConnections: any;
}

export const logInReqService = async (inputs: logInRequestServiceInput) => {
  const { phone } = inputs.inputs;

  try {
    const foundUser = await getUserByPhoneRepo({ phone });
    
    // const randomCode = process.env.NODE_ENV === "development"
    //   ? 11111
    //   : Math.floor(10000 + Math.random() * 90000);
    const randomCode = 111111;

    const sendCode = async (user: IUser) => {
      inputs.redisConnections.setEx(phone, 100, String(randomCode));
      process.env.NODE_ENV === "production" && await axios.post(
        `https://panel.asanak.com/webservice/v1rest/sendsms?username=pishrun&password=Pishrun@654&source=982100021&destination=${phone}&message=کد ورود شما : ${randomCode}`,
      );
      return formatData({
        Status: "Ok",
        data: user,
      });
    };

    const sendCodeWithCreateUser = async () => {
      const newUser = await addUserByPhoneRepo({ phone });
      return await sendCode(newUser);
    };

    return foundUser
      ? await sendCode(foundUser)
      : await sendCodeWithCreateUser();
  } catch (err) {
    throw new APIError(
      "APIERROR",
      STATUS_CODES.UN_AUTHORISED,
      (err as APIError).description || err.message || "Can not logIn",
    );
  }
};
