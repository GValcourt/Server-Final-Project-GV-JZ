import mongoose from 'mongoose';
import articleSchema from './article-schema.js'
const articleModel = mongoose
              .model('ArticleModel', articleSchema, "articles");
export default articleModel;