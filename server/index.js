const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors({
  credentials: true
}));
app.options('*', cors());
app.use(express.json()); 

routes(app);

const URL = process.env.MONGODB;

const connectDB = async () => {
  try {
    await mongoose.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB();

app.listen(port, () => {
  console.log('Server is running on port:', port);
});
