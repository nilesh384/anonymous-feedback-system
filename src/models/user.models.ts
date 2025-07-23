import mongoose, {Schema, Document} from "mongoose";
import { Message } from "./message.models";
import MessageSchema from "./message.models";

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    isVerified: boolean,
    verifyCodeExpiry: Date,
    isAcceptingMessage: boolean,
    messages: Message[]
} 

const UserSchema: Schema<User> = new Schema<User>({
    username: {type: String, required: [true, "Username is required"], trim: true, unique: true},
    email: {type: String, required: [true, "Email is required"], match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], unique: true},    
    password: {type: String, required: [true, "Password is required"]},
    verifyCode: {type: String, required: true},
    verifyCodeExpiry: {type: Date, required: true},
    isAcceptingMessage: {type: Boolean, required: true, default: true},
    isVerified: {type: Boolean, default: false},
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel