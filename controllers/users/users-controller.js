import * as usersDao from './users-dao.js'
import * as followsDao from './follows/follows-dao.js'

const UsersController = async (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.get('/api/users/pred/:pred/:value', findUsersPred);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser)
    app.post('/api/users/:auid/follows/:buid', userBeingFollowed)
    app.delete('/api/users/:auid/follows/:buid', unFollow)
    app.get('/api/users/:uid/follows', getFollower)
    app.get('/api/users/:uid/followed', getFollowed)
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

const userBeingFollowed = async (req, res) => {
    const auid = req.params.auid;
    const buid = req.params.buid;
    const  newFollow = {follower: auid, followed: buid}
    const status = await followsDao.createFollow(newFollow);
    res.json(status);
}

const getFollower = async (req, res) => {
    const userId = req.params.uid;
    const followers = await followsDao.findEntrysByFollower(userId);
    res.json(followers);
}

const getFollowed = async (req, res) => {
    const userId = req.params.uid;
    const followers = await followsDao.findEntrysByFollowed(userId);
    res.json(followers);
}

const unFollow = async (req, res) => {
    const userId = req.params.auid;
    const followerId = req.params.buid;
    const status = await followsDao.deleteFollow(userId, followerId);
    res.json(status);
}

export default UsersController;