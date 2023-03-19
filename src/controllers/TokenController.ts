import {Request, Response, NextFunction} from "express";
import {cookie} from "express-validator";
const TokenService = require( '../services/TokenService')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
class TokenController{
    async registration(req:Request, res:Response, next:NextFunction){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty())
                return next(ApiError.BadRequest("Ошибка валидации", errors.array()))
            const {link, password} = req.body
            const userData= await TokenService.registration(link, password.toString())
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60 *60*1000, httpOnly:true})
            return res.json(userData)
        }catch (e){
             next(e)
        }
    }
    async login(req:Request, res:Response, next:NextFunction){
        try{
            const {link, password} = req.body
            const userData=await TokenService.login(link, password)
            res.cookie('refreshToken', userData.refreshToken,
                {maxAge:30*24*60 *60*1000, httpOnly:true, sameSite:'none', secure:true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
    async logout(req:Request, res:Response, next:NextFunction){
        try{
            const {link} = req.body
            const token = await TokenService.logout(link)
            res.clearCookie('refreshToken')
            const {refreshToken}=req.cookies
            return res.status(200).json('logout')
        }catch (e){
            next(e)
        }
    }
    async refresh(req:Request, res:Response, next:NextFunction){
        try{
            const {refreshToken}=req.cookies
            const userData=await TokenService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30*24*60 *60*1000, httpOnly:true})
            return res.json(userData.accessToken)
        }catch (e){
            next(e)
        }
    }
    async activate(req:Request, res:Response, next:NextFunction){
        try{

        }catch (e){
            next(e)
        }
    }
}


export default new TokenController;