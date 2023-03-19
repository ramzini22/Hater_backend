import * as mongoose from "mongoose";
import {IUSer} from "./types";

const User= new mongoose.Schema<IUSer>({
    _id:{type:String, require:true},
    data:{
        name:{type:String, require:true},
        surname:{type:String, require:true},
        userLink:{type:Number, require:true}
    }
})

export default mongoose.model('id_to_user', User)
