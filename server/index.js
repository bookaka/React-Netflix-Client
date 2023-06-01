import express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import mongoose from 'mongoose';
import userRouters from './routers/user.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Router
app.use("/user", userRouters);

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));


