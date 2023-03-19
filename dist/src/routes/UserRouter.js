"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const authMiddlewear = require('../middlewears/auth-middlewear');
const router = (0, express_1.default)();
router.post('/setUser', authMiddlewear, UserController_1.default.create);
router.get('/getUserByLink', UserController_1.default.find);
exports.default = router;
