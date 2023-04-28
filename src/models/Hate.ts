import {model, Schema} from "mongoose";
import {IRegUser} from "./types";

const RegUser= new Schema<any>({
    _id:{type:String , required:true},
    title:{type:String, required: true},
})

export default model('reg_user', RegUser)