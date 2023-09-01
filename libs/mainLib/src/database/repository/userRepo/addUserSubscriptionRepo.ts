import { APIError,STATUS_CODES } from "../../../../../utils/src/lib/error/appErr";
import { add, compareAsc } from 'date-fns';
import { assert, enums, Infer, object, optional, string } from 'superstruct';
import {objectIdValidation} from "../../../utils/validation";
import { UserModel, UserType } from "../../models/User";
import { PurchaseModel, durationEnum } from "../../models/Purchase";
const AddUserSubscriptionStruct = object({
    _id: objectIdValidation,
    duration: enums(durationEnum),
    description: optional(string()),
  });
  
  export type AddUserSubscriptionInp = Infer<typeof AddUserSubscriptionStruct>;
  
  // TODO :: sould :checked payment and implement procedure of its
  export const addUserSubscriptionRepo = async (
    addUserSubscriptionRepoInp: AddUserSubscriptionInp
  ) => {
    try {
      assert(addUserSubscriptionRepoInp, AddUserSubscriptionStruct);
      const { _id, duration, description } = addUserSubscriptionRepoInp;
      const foundUser = await UserModel.findById(_id).exec();
  
      const userSubscription = foundUser?.subscription
        ? new Date(foundUser.subscription)
        : new Date();
  
      const addedTime =
        compareAsc(userSubscription, new Date()) > 0
          ? userSubscription
          : new Date();
  
      const updatedSubscrib =
        duration === 6
          ? add(addedTime, { months: 6 })
          : add(addedTime, {
              years: duration,
            });
  
      const updatedUser = await foundUser?.updateOne(
        {
          $set: { subscription: updatedSubscrib },
        },
        { new: true }
      );
  
      const newPurchase = new PurchaseModel({
        user: foundUser?._id,
        duration,
        description,
        from: addedTime,
        to: updatedSubscrib,
      });
  
      await newPurchase.save();
  
      return {
        updatedUser,
        purchase: newPurchase,
      };
    } catch (err) {
      throw new APIError(
        'API Error',
        (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
        (err as APIError).description || err.message || 'Unable to found any user'
      );
    }
  };
  