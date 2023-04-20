import express from 'express'
import cors from 'cors'
import HelloController
  from "./controllers/hello-controller.js"
import ArticleController from "./controllers/articles/article-controller.js"
import GoogleController from './controllers/google/google-controller.js'
import ImageController from './controllers/image-server/image-server-controller.js'
import session from 'express-session'
import mongoose from "mongoose";
  const CONNECTION_STRING = process.env.DB_CONNECTION_STRING_FINAL
  mongoose.connect(CONNECTION_STRING);
  //console.log(CONNECTION_STRING)

var sessionOptions = {
    secret: "secret",
    resave : true,
    saveUninitialized : false
};
  


const app = express()
app.use(cors())
app.use(express.json());
app.use(session(sessionOptions));
ArticleController(app)
HelloController(app)
GoogleController(app)
ImageController(app)
app.listen(4000)