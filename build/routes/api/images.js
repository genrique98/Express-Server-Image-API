"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sharp_1 = __importDefault(require("sharp"));
var path = require('path');
var images = express_1.default.Router();
// upon request create thumbnail using parameters, and add caching. 
// make sure you can run "node build/index", write tests
// const useSharp = (req: express.Request, res: express.Response, next: Function):void => {
//     req.query.width : number;
//     const filePath = `images/full/${req.query.filename}.jpg`;
//     const outputPath = `images/thumb/${req.query.filename}_thumb.jpg`;
//     sharp(filePath).resize(req.query., req.query.height).toFile(outputPath).then(info => {console.log(info)}).catch(err => {console.log(err)});
//     next();
// }
images.get('/', function (req, res, next) {
    var options = {
        root: process.cwd(),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    // ?filename=fjord&width=200&height=200
    var param = req.query;
    var filename = param.filename;
    var filePath = "images/full/" + filename + ".jpg"; //const filePath = `images/full/${req.query.filename}.jpg`;
    var outputPath = filePath;
    if (req.query.width && req.query.height) {
        var width = parseInt(req.query.width);
        var height = parseInt(req.query.height);
        outputPath = "images/thumb/" + filename + "_thumb.jpg";
        // check if outputPath already exists, if it does, dont use sharp, just return path
        sharp_1.default(filePath).resize(width, height).toFile(outputPath).then(function (info) { console.log(info); }).catch(function (err) { console.log(err); });
    }
    process.nextTick(function () {
        res.sendFile(outputPath, options, function (err) {
            if (err) {
                next(err);
            }
            else {
                console.log('Sent:', outputPath);
            }
        });
    });
});
exports.default = images;
