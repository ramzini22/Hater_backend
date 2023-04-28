import {model, Schema} from "mongoose";
import {IRegUser} from "./types";

const RegUser= new Schema<IRegUser>({
    _id:{type:String , required:true},
    password:{type:String, required: true},
    fingerprint:{type:String, required: true},
    isActivated:{type:Boolean, default:false},
    refreshToken:{type:String, required:true}
})

export default model('reg_user', RegUser)