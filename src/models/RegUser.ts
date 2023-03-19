import * as mongoose from "mongoose";
import {IRegUser} from "./types";

const RegUser= new mongoose.Schema<IRegUser>({
    _id:{type:String , required:true},
    password:{type:String, required: true},
    isActivated:{type:Boolean, default:false},
    refreshToken:{type:String, required:true}
})

export default mongoose.model('reg_user', RegUser)