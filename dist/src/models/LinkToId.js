"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SITES = exports.INST = exports.VK = void 0;
const mongoose_1 = require("mongoose");
const link = new mongoose_1.Schema({
    _id: { type: String, require: true },
    link: { type: String, require: true },
    idCreator: { type: String, required: true },
    fingerprintCreator: { type: String, required: true },
});
const VK = (0, mongoose_1.model)('link_to_id_vk', link);
exports.VK = VK;
const INST = (0, mongoose_1.model)('link_to_id_inst', link);
exports.INST = INST;
const SITES = (0, mongoose_1.model)('link_to_id_sites', link);
exports.SITES = SITES;
