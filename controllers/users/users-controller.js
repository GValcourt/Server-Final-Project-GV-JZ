import * as usersDao from './users-dao.js'

const UsersController = async (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.get('/api/users/pred/:pred/:value', findUsersPred);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const deleteUser = async (req, res) => {
    const userId = req.params['uid'];
    const status = await usersDao.deleteUser(userId);
    res.json(status);
}

const updateUser = async (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    const status = await usersDao.updateUser(userId, updates);
    res.json(status);
}

const findUsers = async (req, res) => {
    const users = await usersDao.findUsers();
    res.json(users)
}

const findUserById = async (req, res) => {
    const userId = req.params.uid;
    const user = await usersDao.findUserByID(userId);
    res.json(user)
}

const findUsersPred = async (req, res) => {
    let pred = req.params.pred
    let value = req.params.value
    let users = await usersDao.findUsersPred(pred, value)
    res.json(users)
}


const findUsersByType = async (req, res) => {
    const type = req.params.type;
    const users = await usersDao.findUsersByType(type);
    res.json(users);
}

export default UsersController;