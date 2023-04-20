import * as articleDao from './article-dao.js'
import * as locationDao from '../locations/location-dao.js'

const ArticleController = (app) => {
    app.get('/api/articles', findArticles);
    app.get('/api/articles/:uid', findArticleById);
    app.get('/api/articles/byplace/:uid', findArticleByPlace);
    app.get('/api/articles/pred/:pred/:value', findArticlePred);
    app.post('/api/articles', createArticle);
    app.delete('/api/articles/:uid', deleteArticle);
    app.put('/api/articles/:uid', updateArticle);
}

async function replaceLocationID(articles){
  for (let j = 0; j < articles.length; j++){
    let newArray = [];
    //console.log(articles[j])
    for (let i = 0; i < articles[j].location.length; i++){
      let newLocation = await locationDao.findLocationbyMongoID(articles[j].location[i]);
      //console.log(newLocation)
      newArray.push(newLocation[0])
    }
    //console.log(newArray)
    articles[j] = {
      ...articles[j]._doc,
      location: newArray};
    //console.log(articles[j].location)
  }
  return articles
}


const createArticle = async (req, res) => {
    const newArticle = req.body;
    let newArray = []
    newArticle.date = (new Date).toDateString();
    for (let i = 0; i < newArticle.location.length; i++){
      let locationQuery = await locationDao.findLocationbyPlaceID(newArticle.location[i].placeID)
      if (locationQuery.length === 0){
        await locationDao.createLocation(newArticle.location[i])
      }
      let mongoID = await locationDao.findLocationbyPlaceID(newArticle.location[i].placeID)
      //console.log(mongoID[0])
      newArray.push(mongoID[0]._id)
    }
    const orgArticle = {...newArticle};
    //console.log(newArray)
    newArticle.location = newArray
    //console.log(newArticle.location)
    //console.log(req.body)
    //handling place_id on client side
    //console.log(newArticle)
    let insertedArticle = await articleDao.createArticle(newArticle);
    orgArticle._id = insertedArticle._id
    res.json(orgArticle);
}

const deleteArticle = async (req, res) => {
    const articleId = req.params['uid'];
    let value = await articleDao.deleteArticle(articleId)
    res.sendStatus(200);
}

const updateArticle = async (req, res) => {
    const articleId = req.params['uid'];
    const updates = req.body;
    let value = await articleDao.updateArticle(articleId, updates)
    res.sendStatus(200);
}

const findArticles = async (req, res) => {
  const articles = await articleDao.findArticles();
  //console.log(articles)
  let modifiedArticles = await replaceLocationID(articles)
  //console.log(modifiedArticles)
  res.json(modifiedArticles);
}

const findArticleById = async (req, res) => {
    //console.log(req.params)
    const articleId = req.params.uid;
    //console.log(articleId)
    const article = await articleDao.findArticlebyAid(articleId)
    //waste not; want not
    let articlePlaceholder = await replaceLocationID([article])
    //console.log(articlePlaceholder[0])
    res.json(articlePlaceholder[0]);
}

const findArticleByPlace = async (req, res) => {
  const place_id = req.params.uid;
  console.log(place_id)
  let mongo_id = await locationDao.findLocationbyPlaceID(place_id)
  console.log(mongo_id)
  if (mongo_id === null){
    res.json([])
    return
  }
  const articles = await articleDao.findArticlesbyLocation(mongo_id._id.toString())
  //console.log(articles)
  let modifiedArticles = await replaceLocationID(articles)
  if (modifiedArticles.length > 0){
    //console.log(modifiedArticles[0]._id)
  }
  res.json(modifiedArticles);
}


const findArticlePred = async (req, res) => {
  const pred = req.params.pred;
  const value = req.params.value;
  const articles = await articleDao.findArticlesPred(pred, value)
  let modifiedArticles = await replaceLocationID(articles)
  res.json(modifiedArticles);
}

export default ArticleController