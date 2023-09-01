import { APIError, STATUS_CODES } from "../../../../utils/src/lib/error/appErr";
import { formatData } from "../../../../utils/src/lib/format/formatData";
import { GetBlogsInp, getBlogsRepo } from "../../database/repository/blogRepo/getBlogsRepo";

export interface getBlogServiceInp {
    inputs: GetBlogsInp;
  }
  
  export const getBlogsService = async (inputs: getBlogServiceInp) => {
    try {
      const foundedBlog = await getBlogsRepo(inputs.inputs);
  
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