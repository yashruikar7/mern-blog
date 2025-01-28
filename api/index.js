import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

// mongodb+srv://yash:yash@500599@mern-blog.ign7jfi.mongodb.net/mern-blog?retryWrites=true&w=majority&appName=mern-blog

mongoose
  // .connect(process.env.MONGO)
  .connect('mongodb+srv://yashruikar77:yashruikar77@mern-blog.llh2o9p.mongodb.net/mernBlog?retryWrites=true&w=majority&appName=mern-blog')
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());       //Middleware to parse incoming JSON requests.
// Without this middleware, the incoming JSON data from a request would not be automatically parsed, so the req.body would be undefined or contain the raw data in string format.

app.use(cookieParser());      //to get cookie

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

//here all the url request are passesd by userroutes to diffrent file
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
