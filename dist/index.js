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
const express_1 = __importDefault(require("express"));
const UserRouter_1 = __importDefault(require("./src/routes/UserRouter"));
const TokenRouter = require('./src/routes/TokenRouter');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL || "";
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const cors = require('cors');
const errorMiddleware = require('./src/middlewears/error-widdlewear');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
app.use(cookieParser());
app.use('/token', TokenRouter);
app.use('/api', UserRouter_1.default);
app.use(errorMiddleware);
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose_1.default.set('strictQuery', true);
            mongoose_1.default.connect(dbUrl);
            app.listen(port, () => {
                console.log(`now listening on port ${port}`);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
startApp();