import { APIError, STATUS_CODES } from "../../../../utils/src/lib/error/appErr";
import { formatData } from "../../../../utils/src/lib/format/formatData";
import { AddBlogInp, addBlogRepo } from "../../database/repository/blogRepo/addBlogRepo";

export interface addBlogServiceInp {
    inputs: AddBlogInp,
    redisConnections: any
};

export const addBlogService = async (inputs: addBlogServiceInp) => {
    try {
      const newBlog = await addBlogRepo(inputs.inputs);
  
      if (newBlog === null) {
        throw new APIError(
          'API Error',
          STATUS_CODES.INTERNAL_ERROR,
          'Unable to create new blog'
        );
      }
  
      return formatData({ blog: newBlog });
    } catch (err) {
      throw new APIError(
        'API Error',
        (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
        (err as APIError).description ||
          err.message ||
          'Unable to create new Blog'
      );
    }
  };
  