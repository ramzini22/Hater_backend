import RegUser from "../models/RegUser";
import exp from "constants";
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const ApiError=require('../exceptions/api-error')
class TokenService {
    createTokens(payload:string){
        const accessToken=jwt.sign({name:payload}, process.env.JWT_ACCESS_SECRET, {expiresIn:"30m"})
        const refreshToken=jwt.sign({name:payload}, process.env.JWT_REFRESH_SECRET, {expiresIn:"30d"})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId:string, refreshToken:string){
        const tokenData=await RegUser.findById(userId)
        if(tokenData){
            tokenData.refreshToken=refreshToken
            return tokenData.save()
        }
    }
    async registration(link:string, BegPassword:string){
        const user=await RegUser.findById(link)
        if(user){
             throw ApiError.BadRequest("Пользователь уже существует", ['link'])
        }
        const password=await bcrypt.hash(BegPassword, 7)
        const tokens= this.createTokens(link);
        const newUser=await RegUser.create({password, _id:link, refreshToken:tokens.refreshToken})
        return {
            ...tokens,
            user:newUser
        }
    }

    async login(link:string, password:string){
        const user=await RegUser.findById(link)
        if(!user)
            throw ApiError.BadRequest("Пользователь не существует",['link'])
        const isPasswordEquals=await bcrypt.compare(password, user.password)
        if(!isPasswordEquals)
            throw ApiError.BadRequest("Неверный пароль", ['password'])
        const tokens=this.createTokens(link)
        await this.saveToken(link, tokens.refreshToken)
        return {...tokens, user}
    }

    async logout(link:string){
        const token = await RegUser.findById(link)
        // тут прописать ужаление рефреш токена из бд
    }

    async refresh(refreshToken:string){

        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const link=this.validateRefreshToken(refreshToken)
        const user=await RegUser.findById(link)
        if(!user)
            throw ApiError.UnauthorizedError()
        const tokens=this.createTokens(link)
        await this.saveToken(link, tokens.refreshToken)
        return {...tokens, user}
    }

    validateAccessToken(token:string){
        try{
            const link=jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return link?.name
        }catch (e){
            return null
        }
    }

    validateRefreshToken(token:string){
        try{
            const link=jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return link?.name
        }catch (e){
            return null
        }
    }

}
module.exports = new TokenService()