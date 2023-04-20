import express from 'express'
import cors from 'cors'
import HelloController
  from "./controllers/hello-controller.js"
import ArticleController from "./controllers/articles/article-controller.js"
import GoogleController from './controllers/google/google-controller.js'
import ImageController from './controllers/image-server/image-server-controller.js'
import UsersController from "./controllers/users/users-controller.js";
import session from "express-session";
import AuthController from "./controllers/users/auth-controller.js";


const app = express();
app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: true,
    })
);


app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
);
app.use(express.json());
const port = process.env.PORT || 4000;

AuthController(app);
ArticleController(app)
HelloController(app)
GoogleController(app)
ImageController(app)
UsersController(app)
app.listen(port)