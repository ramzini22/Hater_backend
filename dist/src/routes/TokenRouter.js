"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TokenController_1 = __importDefault(require("../controllers/TokenController"));
const TokenRouter = (0, express_1.default)();
const { body } = require('express-validator');
TokenRouter.post('/registration', body('link').isString(), body('password').isLength({ min: 8 }), TokenController_1.default.registration);
TokenRouter.post('/login', TokenController_1.default.login);
TokenRouter.post('/logout', TokenController_1.default.logout);
TokenRouter.post('/activate', TokenController_1.default.activate);
TokenRouter.get('/refresh', TokenController_1.default.refresh);
module.exports = TokenRouter;
