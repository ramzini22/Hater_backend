import {model, Schema} from "mongoose";
import {IUSer} from "./types";

const User= new Schema<IUSer>({
    _id:{type:String, require:true},
    data:{
        name:{type:String, require:true},
        surname:{type:String, require:true},
        userLink:{type:Number, require:true},
    }
})

export default model('id_to_user', User)
