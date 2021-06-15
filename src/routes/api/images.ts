import express, { Router } from 'express';
import { existsSync } from 'fs';
import { checkPath, logSharp } from '../../utilities/util';

const images: Router = express.Router();
let outputPath: string;

const getImage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const filename: string = req.query.filename as unknown as string;
  const filePath = `images/full/${filename}.jpg`;
  outputPath = filePath;

  checkPath(filePath);

  // if query paramaters exist
  if (req.query.width && req.query.height) {
    const width: number = parseInt(req.query.width as unknown as string);
    const height: number = parseInt(req.query.height as unknown as string);

    outputPath = `images/thumb/${filename}_thumb_${width}x${height}.jpg`;

    // if outputPath does not exist, use sharp
    if (!existsSync(outputPath)) {
      logSharp(filePath, outputPath, width, height);
    } else {
      console.log(`Image accessed from disk`);
    }
  }
  next();
};

images.get(
  '/',
  getImage,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const options: unknown = {
      root: process.cwd(),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
      },
    };

    setTimeout(() => {
      res.status(200).sendFile(outputPath, options, function (err) {
        if (err) {
          next(err);
          console.log(err);
        } else {
          console.log('Sent:', outputPath);
        }
      });
    }, 1000);
  }
);

export default images;
