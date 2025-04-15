const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    console.log('url', process.env.MONGO_URI);
    
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/products');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log(` MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`X MongoDB Connection Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
