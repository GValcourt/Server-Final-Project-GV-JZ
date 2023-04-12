import express from 'express'
import cors from 'cors'
import HelloController
  from "./controllers/hello-controller.js"
import ArticleController from "./controllers/articles/article-controller.js"
import GoogleController from './controllers/google/google-controller.js'
import ImageController from './controllers/image-server/image-server-controller.js'

const app = express()
app.use(cors())
app.use(express.json());
ArticleController(app)
HelloController(app)
GoogleController(app)
ImageController(app)
app.listen(4000)