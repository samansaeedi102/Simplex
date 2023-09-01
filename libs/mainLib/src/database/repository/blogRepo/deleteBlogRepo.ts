import { Infer, assert, object } from "superstruct";
import { objectIdValidation } from "../../../utils/validation";
import { BlogModel } from "../../models/Blog";
import { APIError, STATUS_CODES } from "../../../../../utils/src/lib/error/appErr";
import { deleteModelByAdmin } from "../../../utils/types/adminCrud";


const DeleteBlogStruct = object({
    _id: objectIdValidation,
    adminId: objectIdValidation,
  });
  
  export type DeleteBlogInp = Infer<typeof DeleteBlogStruct>;
  
  export const deleteBlogRepo = async (deleteBlogRepoInp: DeleteBlogInp) => {
    try {
      assert(deleteBlogRepoInp, DeleteBlogStruct);
      const { _id, adminId } = deleteBlogRepoInp;
      return await deleteModelByAdmin(BlogModel, adminId, _id);
    } catch (err) {
      throw new APIError(
        'API Error',
        (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
        (err as APIError).description || err.message || 'Unable to found any Blog'
      );
    }
  };
  