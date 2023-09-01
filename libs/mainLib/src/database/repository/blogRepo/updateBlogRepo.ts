import { array, assert, Infer, object, optional, string } from 'superstruct';
import { objectIdValidation } from '../../../utils/validation';
import { BlogModel } from '../../models/Blog';
import { UserModel, UserType } from '../../models/User';
import { Types } from 'mongoose';
import { APIError, STATUS_CODES } from '../../../../../utils/src/lib/error/appErr';
import { throwErr } from '../../../../../utils/src/lib/error/throw';


const UpdateBlogStruct = object({
    _id: objectIdValidation,
    adminId: objectIdValidation,
    description: string(),
    title: string(),
    mainPic: optional(objectIdValidation),
    audio: optional(objectIdValidation),
    documents: optional(array(objectIdValidation)),
  });
  
  export type UpdateBlogInp = Infer<typeof UpdateBlogStruct>;
  
  export const updateBlogRepo = async (updateBlogRepoInp: UpdateBlogInp) => {
    try {
      assert(updateBlogRepoInp, UpdateBlogStruct);
      const { _id, adminId, ...rest } = updateBlogRepoInp;
  
      const foundBlogPost = await BlogModel.findById(_id).exec();
  
      const checkAuther = async () => {
        const foundAdmin = await UserModel.findById(adminId).exec();
        return foundAdmin &&
          ((foundAdmin._id as Types.ObjectId).equals(_id) ||
            foundAdmin.type.includes(UserType.Admin))
          ? true
          : false;
      };
  
      const updatedingBlogPost = async () => {
        return await foundBlogPost?.updateOne({ $set: { rest } }, { new: true });
      };
  
      return foundBlogPost && (await checkAuther())
        ? await updatedingBlogPost()
        : throwErr(
            'you can not update this blog post',
            STATUS_CODES.UN_AUTHORISED
          );
    } catch (err) {
      throw new APIError(
        'API Error',
        (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
        (err as APIError).description || err.message || 'Unable to update Blog'
      );
    }
  };
  