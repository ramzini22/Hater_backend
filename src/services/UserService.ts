import User from "../models/User";
import {INST, VK, SITES} from "../models/LinkToId";
import {IUSer} from "../models/types";
import currectSchemaByLinkType from "../helpers/currectSchemaByLinkType";
import mongoose, {ClientSession} from "mongoose";
import user from "../models/User";
const ApiError=require('../exceptions/api-error')
class UserService{
    async create({link:_id, linkType, name, surname, idCreator}:{link:string, linkType:string, name:string, surname:string, idCreator:string}, fingerprint:string){
        const count:Array<IUSer>= await User.find();
        const link=count.length+1;
        const Place=currectSchemaByLinkType(Number(linkType))
        const ExistLinkToId = await Place.findById(_id)
        if(ExistLinkToId)
            throw ApiError.BadRequest("Пользователь уже сещуствует", ['link'])

        await Place.create({_id, link, idCreator, fingerprintCreator:fingerprint})
        const user = await User.create({_id: link, data: {name, surname, userLink: link}})
            if (user) return user
        else
            throw ApiError.BadRequest("Пользователь уже сещуствует", ['link'])
    }
    async searchByLink(link:any, type:any) {
        const Place=currectSchemaByLinkType(Number(type))
        const _id = await Place.findById(link, {link:1, _id:0});
        if(!_id)
            return null
        return User.findById(_id.link)
    }
    async searchById(_id:any) {
        const user = await User.findById(_id, {_id:0, data:1} );
        return user
    }

}

export default new UserService()