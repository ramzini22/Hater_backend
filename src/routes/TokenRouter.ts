import Router from "express";
import TokenController from "../controllers/TokenController";

const TokenRouter= Router()
const {body} = require('express-validator')
TokenRouter.post('/registration',
    body('link').isString(),
    body('password').isLength({min:8}),
    TokenController.registration
)
TokenRouter.post('/login', TokenController.login)
TokenRouter.post('/logout', TokenController.logout)
TokenRouter.post('/activate', TokenController.activate)
TokenRouter.get('/refresh', TokenController.refresh)

module.exports=TokenRouter