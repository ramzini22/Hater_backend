import {VK,INST,SITES} from '../models/LinkToId'
export const CurrectSchemaByLinkType = (type:number):typeof SITES=> {
    let linkSchema=SITES
    if(type==0)linkSchema = VK
    if(type==1)linkSchema = INST

    return  linkSchema
};

export default CurrectSchemaByLinkType;