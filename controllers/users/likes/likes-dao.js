import likesModel from './likes-model.js'

export const findAllLikes = () => likesModel.find();
export const findEntrysByUserID = (uid) => likesModel.find({userID: uid});
export const findEntrysByPlaceID = (pid) => likesModel.find({placeID: pid});
export const createLike = (like) => likesModel.create(like);
export const deleteLike = (auid, buid) => likesModel.deleteOne({userID: auid, placeID: buid});