import followsModel from './follows-model.js'

export const findAllFollows = () => followsModel.find();
export const findEntrysByFollower = (uid) => followsModel.find({follower: uid});
export const findEntrysByFollowed = (uid) => followsModel.find({followed: uid});
export const createFollow = (follow) => followsModel.create(follow);
export const deleteFollow = (auid, buid) => followsModel.deleteOne({follower: auid, followed: buid});