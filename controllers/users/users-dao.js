import usersModel from './users-model'

export const findUsers = () => usersModel.find();
export const findUserByID = (uid) => usersModel.find({_id: uid});
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (uid) => usersModel.deleteOne({_id: uid});
export const updateUser = (uid, user) => usersModel.updateOne({_id: uid}, {$set: user})
export const findUsersByType = (type) => usersModel.find({userType: type});
export const findUserByUsername = (username) => usersModel.findOne({ username });
export const findUserByCredentials = (username, password) => usersModel.findOne({ username, password });

