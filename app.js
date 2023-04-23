import express from 'express'
import cors from 'cors'
import HelloController
    from "./controllers/hello-controller.js"
import ArticleController from "./controllers/articles/article-controller.js"
import GoogleController from './controllers/google/google-controller.js'
import ImageController from './controllers/image-server/image-server-controller.js'
import session from 'express-session'
import mongoose from "mongoose";
import AuthController from "./controllers/users/auth-controller.js";
import UsersController from './controllers/users/users-controller.js'

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING_FINAL
mongoose.connect("mongodb+srv://gvalcourt:gzSt5S33PeL3vhc@web-dev-cluster.upp6ro8.mongodb.net/Final-Project");

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
UsersController(app)
HelloController(app)
GoogleController(app)
ImageController(app)
app.listen(port)