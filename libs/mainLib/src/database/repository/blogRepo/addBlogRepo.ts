
import { APIError, STATUS_CODES } from "../../../../../utils/src/lib/error/appErr"
import { throwErr } from "../../../../../utils/src/lib/error/throw"
import { array, assert, Infer, object, optional, string } from 'superstruct';
import {objectIdValidation} from "../../../utils/validation";
import {BlogModel} from "../../models/Blog";
import { UserModel, UserType } from "../../models/User";


export const AddBlogStruct = object({
    title: string(),
    description: string(),
    author: objectIdValidation
});

export type AddBlogInp = Infer<typeof AddBlogStruct>;

export const addBlogRepo = async (addBlogRepoInp: AddBlogInp) => {
    try {
        assert(addBlogRepoInp, AddBlogStruct);
        const {title, description,author} = addBlogRepoInp;
        // const foundAuthor = await User.findById()

        const foundAuthor = await UserModel.findById(author).exec();

        const createBlogPost = async () => {
            const newBlogPost = new BlogModel({
                title,
                description,
                author
            });
            return await newBlogPost.save();
        };
        return foundAuthor &&
            foundAuthor.type.includes(UserType.Admin || UserType.Editor)
            ? createBlogPost()
            : throwErr('can not create this blog post', STATUS_CODES.UN_AUTHORISED);
    } catch (err) {
        throw new APIError(
          'API Error',
          (err as APIError).statusCode || STATUS_CODES.INTERNAL_ERROR,
          (err as APIError).description || err.message || 'Unable to save new Blog'
        );
    }
}