import mongoose, {Model, Schema, Types} from "mongoose";

export interface IBlog {
    title: string,
    description: string,
    author: Types.ObjectId,
    isDeleted: boolean
}

export const BlogSchema = new Schema<IBlog>({
    title: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: "user"},
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true}
);

export const BlogModel = mongoose.model<IBlog>('Blog', BlogSchema)