"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegUser_1 = __importDefault(require("../models/RegUser"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api-error');
class TokenService {
    createTokens(payload) {
        const accessToken = jwt.sign({ name: payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = jwt.sign({ name: payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
        return {
            accessToken,
            refreshToken
        };
    }
    saveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield RegUser_1.default.findById(userId);
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }
        });
    }
    registration(link, BegPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield RegUser_1.default.findById(link);
            if (user) {
                throw ApiError.BadRequest("Пользователь уже существует", ['link']);
            }
            const password = yield bcrypt.hash(BegPassword, 7);
            const tokens = this.createTokens(link);
            const newUser = yield RegUser_1.default.create({ password, _id: link, refreshToken: tokens.refreshToken });
            return Object.assign(Object.assign({}, tokens), { user: newUser });
        });
    }
    login(link, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield RegUser_1.default.findById(link);
            if (!user)
                throw ApiError.BadRequest("Пользователь не существует", ['link']);
            const isPasswordEquals = yield bcrypt.compare(password, user.password);
            if (!isPasswordEquals)
                throw ApiError.BadRequest("Неверный пароль", ['password']);
            const tokens = this.createTokens(link);
            yield this.saveToken(link, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user });
        });
    }
    logout(link) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield RegUser_1.default.findById(link);
            // тут прописать ужаление рефреш токена из бд
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw ApiError.UnauthorizedError();
            }
            const link = this.validateRefreshToken(refreshToken);
            const user = yield RegUser_1.default.findById(link);
            if (!user)
                throw ApiError.UnauthorizedError();
            const tokens = this.createTokens(link);
            yield this.saveToken(link, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user });
        });
    }
    validateAccessToken(token) {
        try {
            const link = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return link === null || link === void 0 ? void 0 : link.name;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const link = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return link === null || link === void 0 ? void 0 : link.name;
        }
        catch (e) {
            return null;
        }
    }
}
module.exports = new TokenService();
