import { Infer, assert, boolean, defaulted, integer, object, optional, size } from "superstruct";
import { objectIdValidation } from "../../../utils/validation";
import { FilterQuery } from "mongoose";
import { BlogModel, IBlog } from "../../models/Blog";
import { chekingAdmin } from "../../../utils/types/adminCrud";
import { APIError, STATUS_CODES } from "../../../../../utils/src/lib/error/appErr";

const GetBlogsStruct = object({
    documents: optional(boolean()),
    author: optional(boolean()),
    filterAuthor: optional(objectIdValidation),
    filterDeleted: optional(boolean()),
    adminId: optional(objectIdValidation),
    // page: defaulted(size(integer(), 1, Infinity), () => 1),
    // take: defaulted(size(integer(), 2, 60), () => 25),
  });
  
  export type GetBlogsInp = Infer<typeof GetBlogsStruct>;
  
  export const getBlogsRepo = async (getBlogsRepoInp: GetBlogsInp) => {
    try {
      assert(getBlogsRepoInp, GetBlogsStruct);
      const {
        documents,
        author,
        filterAuthor,
        filterDeleted,
        adminId,
        // page,
        // take,
      } = getBlogsRepoInp;
      const filter: FilterQuery<IBlog> = {};
      filterAuthor && (filter.author = filterAuthor);
  
      const foundBlogs = BlogModel.find(filter).sort({ _id: 'desc' });
  
    //   foundBlogs.skip((page - 1) * take);
    //   foundBlogs.limit(take);
  
      const setDeletedFilter = async () => {
        return adminId && (await chekingAdmin(adminId))
          ? (filter.isDeleted = true)
          : (filter.isDeleted = false);
      };
      filterDeleted === true
        ? await setDeletedFilter()
        : (filter.isDeleted = false);
  
      const total = await BlogModel.count(filter).exec();
    //   const isLastPage = total / page < take ? true : false;
  
      documents && foundBlogs.populate('documents');
      author && foundBlogs.populate('author');
      documents && foundBlogs.populate('documents');
      
  
      return { data: await foundBlogs.exec(), total };
    } catch (err) {
      throw new APIError(
        'API Error',
        (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
        (err as APIError).description || err.message || 'Unable to found any Blog'
      );
    }
  };