const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const foodCollection = mongoose.connection.db.collection('fooditems');
    const categoryCollection = mongoose.connection.db.collection('foodCategories');

    const [foodData, foodCategory] = await Promise.all([
      foodCollection.find({}).toArray(),
      categoryCollection.find({}).toArray(),
    ]);

    return { foodData, foodCategory };
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
};

module.exports = connectToMongoDB;
