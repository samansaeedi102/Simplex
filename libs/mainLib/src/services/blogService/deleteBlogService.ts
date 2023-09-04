import { APIError, STATUS_CODES } from "../../../../utils/src/lib/error/appErr";
import { formatData } from "../../../../utils/src/lib/format/formatData";
import { DeleteBlogInp, deleteBlogRepo } from "../../database/repository/blogRepo/deleteBlogRepo";


export interface deleteBlogServiceInp {
    inputs: DeleteBlogInp;
}
export const deleteBlogService = async (inputs: deleteBlogServiceInp) => {
    try {
      const foundedBlog = await deleteBlogRepo(inputs.inputs);
  
      if (foundedBlog === null) {
        throw new APIError(
          'API Error',
          STATUS_CODES.INTERNAL_ERROR,
          'Unable to found any blog'
        );
      }
  
      return formatData({ blog: foundedBlog });
    } catch (err) {
      throw new APIError(
        'API Error',
        (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
        (err as APIError).description || err.message || 'Unable to found any Blog'
      );
    }
  };