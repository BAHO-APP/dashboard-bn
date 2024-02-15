import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);
const db: any = {};

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file: string) => {
    try {
      const model = require(path.join(__dirname, file)).default;
      if (model && model.modelName) {
        db[model.modelName] = model;
      } else {
        console.error(`Invalid model file: ${file}`);
      }
    } catch (error) {
      console.error(`Error loading model file: ${file}`, error);
    }
  });

export default db;
