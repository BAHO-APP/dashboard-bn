import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import router from './src/routes';
import connectDatabase from './src/database/models/db';
import db from './src/database/models/modelsLoader';

const app: Application = express();
const PORT: number = 2222;

app.use(cors());
dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  }),
);

app.get('/', (req, res) => {
  res.send(`<h1>Welcome To Baho-App's kitchen </h1>`);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use('/api/v1', router);

app.listen(PORT, async () => {
  console.log(`✅ Server connected at http://localhost:${PORT}`);

  // Connect to the database
  await connectDatabase();

  // Load models
  console.log('🚀 Loading Mongoose models...');
  console.log('Loaded models:', Object.keys(db));
});

// import express from 'express';
// import { Application } from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import router from './src/routes';
// import session from 'express-session';

// const app: Application = express();

// app.use(cors());
// //configure env;
// dotenv.config();
// // Parser
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//     limit: '10mb',
//   }),
// );

// const PORT: number = 2222;

// app.get('/', (req, res) => {
//   res.send(`<h1>Welcome To Baho-App's kitchen </h1>`);
// });

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//   }),
// );

// app.use('/api/v1', router);

// app.listen(PORT, async () => {
//   console.log(`✅ Server connected at http://localhost:${PORT}`);

//   try {
//     await mongoose.connect(process.env.DATABASE_URL as string);
//     console.log('🐊 Connected To Database');
//   } catch (error) {
//     console.log(`❌ Error to connect Database: ${error}`);
//   }
// });
