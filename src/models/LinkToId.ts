import * as mongoose from "mongoose";
import {ILink} from "./types";

const link= new mongoose.Schema<ILink>({
    _id:{type:String, require:true},
    link:{type:String, require:true},
    idCreator:{type:String, required:true}
})
const VK = mongoose.model('link_to_id_vk', link)
const INST = mongoose.model('link_to_id_inst', link)
const SITES = mongoose.model('link_to_id_sites', link)
export {VK, INST, SITES}