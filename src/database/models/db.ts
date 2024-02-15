import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('🐊 Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to Database:', error);
  }
};

export default connectDatabase;

// import mongoose from 'mongoose';
// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';

// dotenv.config();

// const basename = path.basename(__filename);
// const db: any = {};

// mongoose.connect(process.env.DATABASE_URL as string);

// const connection = mongoose.connection;
// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', () => {
//   console.log('🐊 Connected to MongoDB');
// });

// fs.readdirSync(__dirname)
//   .filter((file: string) => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.ts' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach((file: string) => {
//     try {
//       const model = require(path.join(__dirname, file)).default;
//       if (model && model.modelName) {
//         db[model.modelName] = model;
//       } else {
//         console.error(`Invalid model file: ${file}`);
//       }
//     } catch (error) {
//       console.error(`Error loading model file: ${file}`, error);
//     }
//   });

// export default db;
