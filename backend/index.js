const connectToMongoDB = require('./db');
const dotenv = require('dotenv');
dotenv.config();
const startServer = async () => {
  try {
    const { foodData, foodCategory } = await connectToMongoDB();
    global.foodData = foodData;
    global.foodCategory = foodCategory;

    const express = require('express');
    const app = express();
    const port = 5000;

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    app.use(express.json());

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.use('/api/auth', require('./Routes/Auth'));

    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    // Handle the error appropriately (e.g., show an error message, exit the application).
  }
};

startServer();
