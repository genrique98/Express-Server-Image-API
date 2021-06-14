"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var util_1 = require("../../utilities/util");
var images = express_1.default.Router();
var outputPath;
var getImage = function (req, res, next) {
    var filename = req.query.filename;
    var filePath = "images/full/" + filename + ".jpg";
    outputPath = filePath;
    util_1.checkPath(filePath);
    // if query paramaters exist
    if (req.query.width && req.query.height) {
        var width = parseInt(req.query.width);
        var height = parseInt(req.query.height);
        outputPath = "images/thumb/" + filename + "_thumb.jpg";
        // if outputPath does not exist, use sharp
        if (!fs_1.existsSync(outputPath)) {
            util_1.logSharp(filePath, outputPath, width, height);
        }
        else {
            console.log("Image accessed from disk");
        }
    }
    next();
};
images.get('/', getImage, function (req, res, next) {
    var options = {
        root: process.cwd(),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
        },
    };
    setTimeout(function () {
        res.status(200).sendFile(outputPath, options, function (err) {
            if (err) {
                next(err);
                console.log(err);
            }
            else {
                console.log('Sent:', outputPath);
            }
        });
    }, 1000);
});
exports.default = images;
