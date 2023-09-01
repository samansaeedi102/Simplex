import { APIError, STATUS_CODES } from "../../../../utils/src/lib/error/appErr";
import { formatData } from "../../../../utils/src/lib/format/formatData";
import { UpdateBlogInp, updateBlogRepo } from "../../database/repository/blogRepo/updateBlogRepo";

export interface UpdateBlogServiceInput {
    inputs: UpdateBlogInp;
  }
  
  export const updateBlogService = async (
    inputs: UpdateBlogServiceInput,
  ) => {
    try {
      const updatedBlog = await updateBlogRepo(inputs.inputs);
  
      if (updatedBlog === null) {
        throw new APIError(
          "APIError",
          STATUS_CODES.INTERNAL_ERROR,
          "can not update blog",
        );
      }
  
      return formatData({ blog: updatedBlog });
    } catch (err) {
      throw new APIError(
        "APIError",
        STATUS_CODES.INTERNAL_ERROR,
        (err as APIError).description || "can not update blog",
      );
    }
  };