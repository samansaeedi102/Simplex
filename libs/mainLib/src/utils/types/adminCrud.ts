import { STATUS_CODES } from "../../../../utils/src/lib/error/appErr";
import { Model } from "mongoose";
import { UserModel,UserType } from "../../database/models/User";
import { throwErr } from "../../../../utils/src/lib/error/throw";

interface Inputs {
  [key: string]: any;
}
export const createNewModelByAdmin = async <M, T extends Inputs>(
  Model: Model<M>,
  inputs: T,
  adminId: string,
) => {
  await checkAdmin(adminId);
  return await new Model(inputs).save();
};

export const updateModelByAdmin = async <M, T extends Inputs>(
  Model: Model<M>,
  inputs: T,
  adminId: string,
  _id: string,
) => {
  await checkAdmin(adminId);
  return await Model.findOneAndUpdate({ _id }, {
    $set: inputs,
  }, { new: true })
    .exec();
};

export const deleteModelByAdmin = async <M>(
  Model: Model<M>,
  adminId: string,
  _id: string,
) => {
  await checkAdmin(adminId);
  return await Model.findOneAndUpdate({ _id }, {
    $set: { isDeleted: true },
  }, { new: true })
    .exec();
};

export const checkAdmin = async (
  adminId: string,
) => {
  const foundCreator = await UserModel.findById(adminId)
    .exec();
  return !foundCreator?.type.includes(UserType.Admin) &&
    throwErr(
      "you can't' create/update/delete/get this model",
      STATUS_CODES.UN_AUTHORISED,
    );
};

export const chekingAdmin = async (
  adminId: string,
) => {
  const foundCreator = await UserModel.findById(adminId)
    .exec();
  return foundCreator?.type.includes(UserType.Admin);
};
