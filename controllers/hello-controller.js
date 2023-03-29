

const HelloController = (app) => {
    app.get('/hello', (req, res) => {
      res.send('Life is good!')
    })
    app.get('/', (req, res) => {
      res.send("This is the API for the CS5610 travel blog of Gregory Valcourt and Josie Zvelebilova")
    })
  }
  export default HelloController;