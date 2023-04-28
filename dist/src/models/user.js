"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    _id: { type: String, require: true },
    data: {
        name: { type: String, require: true },
        surname: { type: String, require: true },
        userLink: { type: Number, require: true },
    }
});
exports.default = (0, mongoose_1.model)('id_to_user', User);
