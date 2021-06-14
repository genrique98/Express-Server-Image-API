import { promises as fsPromises } from 'fs';
import sharp, { OutputInfo } from 'sharp';

export const checkPath = async (filePath: string) => {
  // check image exists in "full" folder
  try {
    await fsPromises.access(filePath);
  } catch (err) {
    console.log(err);
  }
};

export const logSharp = async (filePath: string, outputPath: string, width: number, height: number) => {
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
