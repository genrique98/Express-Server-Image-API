import express from 'express';
import {promises as fsPromises} from 'fs';
import sharp from 'sharp';

var path = require('path');

const images = express.Router();

// upon request create thumbnail using parameters, and add caching. 
// make sure you can run "node build/index", write tests

// const useSharp = (req: express.Request, res: express.Response, next: Function):void => {
//     req.query.width : number;

//     const filePath = `images/full/${req.query.filename}.jpg`;
//     const outputPath = `images/thumb/${req.query.filename}_thumb.jpg`;
//     sharp(filePath).resize(req.query., req.query.height).toFile(outputPath).then(info => {console.log(info)}).catch(err => {console.log(err)});

//     next();
// }

images.get('/', (req: express.Request, res: express.Response, next: Function) => {

    var options = {
        root: process.cwd(),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
    }

    // ?filename=fjord&width=200&height=200
    const param = req.query;
    const filename = (param.filename as unknown) as string;
    const filePath: string = `images/full/${filename}.jpg`; //const filePath = `images/full/${req.query.filename}.jpg`;
    var outputPath: string = filePath;

    if (req.query.width && req.query.height) {

        const width: number = parseInt((req.query.width as unknown) as string); 
        const height: number = parseInt((req.query.height as unknown) as string); 

        outputPath = `images/thumb/${filename}_thumb.jpg`;

        // check if outputPath already exists, if it does, dont use sharp, just return path


        sharp(filePath).resize(width, height).toFile(outputPath).then(info => {console.log(info)}).catch(err => {console.log(err)});
    } 

    
    process.nextTick(() => {
        res.sendFile(outputPath, options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('Sent:', outputPath)
            }
        });
    });

});

export default images;