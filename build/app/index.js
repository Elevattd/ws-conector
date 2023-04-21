"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const PORT = 3000;
exports.app.get('/ping', (req, res) => {
    console.log('SOME PINGED HERE!!');
    res.send('pong');
});
exports.app.listen(PORT, () => {
    console.log(`WEB SOCKET CONECTOR ===> ON: ${PORT}`);
});
exports.default = exports.app;
