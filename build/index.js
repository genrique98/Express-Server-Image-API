"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
var port = 3000;
app.use('/api', routes_1.default);
// start express server on port
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
exports.default = app;
