import texts from './articles.js'
let articles = texts

const ArticleController = (app) => {
    app.get('/api/articles', findArticle);
    app.get('/api/articles/:uid', findArticleById);
    app.post('/api/articles', createArticle);
    app.delete('/api/articles/:uid', deleteArticle);
    app.put('/api/articles/:uid', updateArticle);
}

//Converts a location string into a formatted url in order to collect the lat and long for storage
async function getLocationFromURL (location = "Museum of Contemporary Art Australia") {
  let url = location.replace(' ', '%20');
  let response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${url}&inputtype=textquery&fields=formatted_address%2Cname%2Cgeometry&key=AIzaSyBq6A5uqteMK_iK8T-d8YlMFmCw3CyQCWA`);

  if (response.ok) {
    let jsonObj = await response.json();

    //console.log(jsonObj.candidates[0])
    return jsonObj.candidates[0]
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

//console.log(await getLocationFromURL()) //for testing

const createArticle = async (req, res) => {
    const newArticle = req.body;
    newArticle._id = parseInt((new Date()).getTime() + '');

    const value = await getLocationFromURL(newArticle.location.locationName)

    newArticle.location = {
      ...newArticle.location.locationName,
      lat : value.location.lat,
      long : value.location.long
    }
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