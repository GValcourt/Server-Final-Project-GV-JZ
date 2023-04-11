import texts from './articles.js'
let articles = texts

const ArticleController = (app) => {
    app.get('/api/articles', findArticle);
    app.get('/api/articles/:uid', findArticleById);
    app.get('/api/articles/byplace/:uid', findArticleByPlace);
    app.get('/api/articles/pred/:pred/:value', findArticleByPred);
    app.post('/api/articles', createArticle);
    app.delete('/api/articles/:uid', deleteArticle);
    app.put('/api/articles/:uid', updateArticle);
}



//console.log(await getPlaceDetails('ChIJ68aBlEKuEmsRHUA9oME5Zh0')) //for testing
//console.log(await getLocationFromURL("Museum of Contemporary Art Australia")) //for testing


const createArticle = async (req, res) => {
    const newArticle = req.body;
    newArticle._postid = (new Date()).getTime() + '';
    newArticle.date = (new Date).toDateString();
    //handling place_id on client side
    //console.log(newArticle)
    articles.push(newArticle);
    res.json(newArticle);
}

const deleteArticle = async (req, res) => {
    const articleId = req.params['uid'];
    articles = articles.filter(art =>
      art._postid !== articleId);
    res.sendStatus(200);
}

const updateArticle = async (req, res) => {
    const articleId = req.params['uid'];
    const updates = req.body;
    articles = articles.map((art) =>
    art._postid === articleId ?
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
    //console.log(req.params)
    const articleId = req.params.uid;
    const article = articles
      .find(a => a._postid === articleId);
    res.json(article);
}

const findArticleByPlace = async (req, res) => {
  const place_id = req.params.uid;
  //console.log(place_id)
  function searchHandler (locations, place_id) {
    let testarray = locations.filter(location => location.placeID === place_id)
    //console.log(testarray)
    if (testarray.length > 0){
      //console.log("place_id in the array")
      return true
    }
    else{
      return false
    }
  }
  const articlesOfType = articles
    .filter(a => searchHandler(a.location, place_id));
  res.json(articlesOfType);
}


const findArticleByPred = async (req, res) => {
  const pred = req.params.pred;
  const value = req.params.value;
  //console.log(place_id)
  const articlesOfType = articles
    .filter(a => a[pred] === value);
  res.json(articlesOfType);
}


export default ArticleController