import {model, Schema} from "mongoose";
import {ILink} from "./types";

const link= new Schema<ILink>({
    _id:{type:String, require:true},
    link:{type:String, require:true},
    idCreator:{type:String, required:true},
    fingerprintCreator:{type:String, required:true},
})
const VK = model('link_to_id_vk', link)
const INST = model('link_to_id_inst', link)
const SITES = model('link_to_id_sites', link)
export {VK, INST, SITES}