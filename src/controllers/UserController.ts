import {Request, Response, NextFunction} from "express";
import UserService from "../services/UserService";

class UserController{
    async create(req:Request, res:Response, next:NextFunction){
        try{
            const fingerprint = req.headers?.fingerprint
            const user=await UserService.create(req.body, fingerprint?fingerprint:'')
            return res.status(200).json(user)
        }catch (e){
            next(e)
        }
    }
    async find(req:Request, res:Response){
        let user;
        const {link, linkType:type, id}=req.query
        if(!id)
            user=await UserService.searchByLink(link, type)
        else
            user=await UserService.searchById(id);
        return res.status(user?200:404).json(user)
    }
    error(res:Response, e:any){
        return res.status(500).json(e)
    }
}
export default new UserController