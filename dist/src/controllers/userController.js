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
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    create(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fingerprint = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.fingerprint;
                const user = yield UserService_1.default.create(req.body, fingerprint ? fingerprint : '');
                return res.status(200).json(user);
            }
            catch (e) {
                next(e);
            }
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const { link, linkType: type, id } = req.query;
            if (!id)
                user = yield UserService_1.default.searchByLink(link, type);
            else
                user = yield UserService_1.default.searchById(id);
            return res.status(user ? 200 : 404).json(user);
        });
    }
    error(res, e) {
        return res.status(500).json(e);
    }
}
exports.default = new UserController;
