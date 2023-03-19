import {NextFunction, Response, Request} from "express";
const ApiError=require('../exceptions/api-error');
const TokenService=require('../services/TokenService')

module .exports=function (req:Request, res:Response, next:NextFunction){
    try {
        const authorizationHeader=req.headers.authorization
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError())
        }
        const accessToken=authorizationHeader.split(' ')[1]
        if(!accessToken)
            return next(ApiError.UnauthorizedError())
        const link=TokenService.validateAccessToken(accessToken)
        if(!link)
            return next(ApiError.UnauthorizedError())
        req.body.idCreator=link
        next()

    }catch (e){
        next(ApiError.UnauthorizedError())
    }
}