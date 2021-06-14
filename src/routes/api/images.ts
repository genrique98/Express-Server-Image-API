import express, { Router } from 'express';
import { existsSync, promises as fsPromises } from 'fs';
import sharp, { OutputInfo } from 'sharp';

const images: Router = express.Router();
let outputPath: string;

const checkPath = async (filePath: string) => {
  // check image exists in "full" folder
  try {
    await fsPromises.access(filePath);
  } catch (err) {
    console.log(err);
  }
};

const logSharp = async (filePath: string, width: number, height: number) => {
  try {
    const {size, format}: OutputInfo = await sharp(filePath)
      .resize(width, height)
      .toFile(outputPath);
    console.log(`Image processed with Sharp`);
    console.log(
      `Size: ${size}, Width: ${width}, Height: ${height}, Format: ${format}`
    );
  } catch (err) {
    console.log(err);

  }
};

const getImage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const filename: string = req.query.filename as unknown as string;
  const filePath: string = `images/full/${filename}.jpg`;
  outputPath = filePath;

  checkPath(filePath);

  if (req.query.width && req.query.height) {
    const width: number = parseInt(req.query.width as unknown as string);
    const height: number = parseInt(req.query.height as unknown as string);

    outputPath = `images/thumb/${filename}_thumb.jpg`;

    // if outputPath does not exist, use sharp
    if (!existsSync(outputPath)) {
      logSharp(filePath, width, height);
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
