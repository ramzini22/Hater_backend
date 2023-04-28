"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RegUser = new mongoose_1.Schema({
    _id: { type: String, required: true },
    password: { type: String, required: true },
    fingerprint: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    refreshToken: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('reg_user', RegUser);
