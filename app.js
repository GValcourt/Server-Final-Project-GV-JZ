import express from 'express'
import cors from 'cors'
import HelloController
  from "./controllers/hello-controller.js"
import ArticleController from "./controllers/articles/article-controller.js"

const app = express()
app.use(cors())
app.use(express.json());
ArticleController(app)
HelloController(app)
app.listen(4000)