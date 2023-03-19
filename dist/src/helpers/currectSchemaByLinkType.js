"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrectSchemaByLinkType = void 0;
const LinkToId_1 = require("../models/LinkToId");
const CurrectSchemaByLinkType = (type) => {
    let linkSchema = LinkToId_1.SITES;
    if (type == 0)
        linkSchema = LinkToId_1.VK;
    if (type == 1)
        linkSchema = LinkToId_1.INST;
    return linkSchema;
};
exports.CurrectSchemaByLinkType = CurrectSchemaByLinkType;
exports.default = exports.CurrectSchemaByLinkType;
