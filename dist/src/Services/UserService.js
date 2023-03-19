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
const User_1 = __importDefault(require("../models/User"));
const currectSchemaByLinkType_1 = __importDefault(require("../helpers/currectSchemaByLinkType"));
const ApiError = require('../exceptions/api-error');
class UserService {
    create({ link: _id, linkType, name, surname, idCreator }) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield User_1.default.find();
            const link = count.length + 1;
            const Place = (0, currectSchemaByLinkType_1.default)(Number(linkType));
            const ExistLinkToId = yield Place.findById(_id);
            if (ExistLinkToId)
                throw ApiError.BadRequest("Пользователь уже сещуствует", ['link']);
            const LinkToId = yield Place.create({ _id, link, idCreator });
            const user = yield User_1.default.create({ _id: link, data: { name, surname, userLink: link } });
            if (user)
                return user;
            else
                throw ApiError.BadRequest("Пользователь уже сещуствует", ['link']);
        });
    }
    searchByLink(link, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const Place = (0, currectSchemaByLinkType_1.default)(Number(type));
            const _id = yield Place.findById(link, { link: 1, _id: 0 });
            if (!_id)
                return null;
            return User_1.default.findById(_id.link);
        });
    }
    searchById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(_id, { _id: 0, data: 1 });
            return user;
        });
    }
}
exports.default = new UserService();
