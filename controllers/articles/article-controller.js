import texts from './articles.js'
let articles = texts

const ArticleController = (app) => {
    app.get('/api/articles', findArticle);
    app.get('/api/articles/:uid', findArticleById);
    app.post('/api/articles', createArticle);
    app.delete('/api/articles/:uid', deleteArticle);
    app.put('/api/articles/:uid', updateArticle);
}


const createArticle = (req, res) => {
    const newArticle = req.body;
    newArticle._id = parseInt((new Date()).getTime() + '');
    articles.push(newArticle);
    res.json(newArticle);
}

const deleteArticle = (req, res) => {
    const articleId = req.params['uid'];
    articles = articles.filter(art =>
      art._id !== articleId);
    res.sendStatus(200);
}

const updateArticle = (req, res) => {
    const articleId = req.params['uid'];
    const updates = req.body;
    articles = articles.map((art) =>
    art._id === articleId ?
        {...art, ...updates} :
        art
    );
    res.sendStatus(200);
}

const findArticle = (req, res) => {
    const type = req.query.type
    if(type) {
      const articleOfType = articles
        .filter(a => a.type === type)
      res.json(articleOfType)
      return
    }
    res.json(articles)
}

const findArticleById = (req, res) => {
    const articleId = req.params.uid;
    const article = articles
      .find(a => a._id === articleId);
    res.json(article);
}

export default ArticleController