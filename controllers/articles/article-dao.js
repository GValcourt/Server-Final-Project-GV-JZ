import articleModel from './article-model.js';
export const findArticles = () => articleModel.find();
export const findArticlebyAid = (aid) => articleModel.findById(aid);
export const findArticlesPred = (pred, value) => articleModel.find({[pred]: value});
export const findArticlesbyLocation = (place_id) => articleModel.find({location:{ $all : [place_id]}});
export const createArticle = (article) => articleModel.create(article);
export const deleteArticle = (aid) => articleModel.deleteOne({_id: aid});
export const updateArticle = (aid, article) => articleModel.updateOne({_id: aid}, {$set: article})