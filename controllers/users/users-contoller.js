import * as usersDao from './users-dao.js'

const UserController = (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.get('/api/users/pred/:pred/:value', findUsersPred);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}


const createUser = async (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    await usersDao.createUser(newUser);
    res.json(newUser);
}

const deleteUser = async (req, res) => {
    const userId = req.params['uid'];
    await usersDao.deleteUser(userId)
    res.sendStatus(200);
}

const updateUser = async (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    await usersDao.updateUser(userId, updates)
    res.sendStatus(200);
}

const findUsers = async (req, res) => {
    let users = await usersDao.findUsers()
    res.json(users)
}

const findUsersPred = async (req, res) => {
  let pred = req.params.pred
  let value = req.params.value
  let users = await usersDao.findUsersPred(pred, value)
  res.json(users)
}

const findUserById = async (req, res) => {
  console.log(req.params)
    const userId = req.params.uid;
    let user = await usersDao.findUserbyUid(userId)
    res.json(user);
}
