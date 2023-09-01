import mongoose, {Model, Schema, Types} from "mongoose";

export enum UserType {
    Admin = "Admin",
    Editor = "Editor",
    Supervisor = "Supervisor",
    Expert = "Expert"
}

export interface IUser {
    _id: Types.ObjectId | string;
    name: string;
    family: string;
    email: string;
    type: UserType[],
    subscription: Date;
    phone: string
}

export const userTypeEnum = ["Admin", "Editor", "Supervisor", "Expert"];
export const userGenderEnum = ["Male", "Female"];

export const UserSchema = new Schema<IUser>({
    name: String,
    family: String,
    email: String,
    type: {
        type: [{
            type: String,
            enum: userTypeEnum
        }],
        default: [UserType.Supervisor]
    },
    subscription: Date,
    phone: String
}, {
    timestamps: true
});

UserSchema.index({ name: "text", email: "text", family: "text" });

export const UserModel = mongoose.model<IUser>("user", UserSchema);