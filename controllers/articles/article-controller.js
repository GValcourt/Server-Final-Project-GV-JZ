import texts from './articles.js'
let articles = texts

import {getLocationFromURL} from '../google/google-controller.js'

const ArticleController = (app) => {
    app.get('/api/articles', findArticle);
    app.get('/api/articles/:uid', findArticleById);
    app.post('/api/articles', createArticle);
    app.delete('/api/articles/:uid', deleteArticle);
    app.put('/api/articles/:uid', updateArticle);
}



//console.log(await getPlaceDetails('ChIJ68aBlEKuEmsRHUA9oME5Zh0')) //for testing
//console.log(await getLocationFromURL("Museum of Contemporary Art Australia")) //for testing


const createArticle = async (req, res) => {
    const newArticle = req.body;
    newArticle._id = (new Date()).getTime() + '';
    newArticle.date = (new Date).toDateString();
    //handling place_id on client side
    //console.log(newArticle)
    articles.push(newArticle);
    res.json(newArticle);
}

const deleteArticle = async (req, res) => {
    const articleId = req.params['uid'];
    articles = articles.filter(art =>
      art._id !== articleId);
    res.sendStatus(200);
}

const updateArticle = async (req, res) => {
    const articleId = req.params['uid'];
    const updates = req.body;
    articles = articles.map((art) =>
    art._id === articleId ?
        {...art, ...updates} :
        art
    );
    res.sendStatus(200);
}

const findArticle = async (req, res) => {
    const type = req.query.type
    if(type) {
      const articleOfType = articles
        .filter(a => a.type === type)
      res.json(articleOfType)
      return
    }
    res.json(articles)
}

const findArticleById = async (req, res) => {
    const articleId = req.params.uid;
    const article = articles
      .find(a => a._id === articleId);
    res.json(article);
}

export default ArticleController