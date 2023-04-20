import locationModel from './location-model.js';
export const findLocations = () => locationModel.find();
export const findLocationbyPlaceID = (place_id) => locationModel.findOne({placeID : place_id});
export const findLocationbyMongoID = (mongo_id) => locationModel.find({_id : mongo_id});
export const createLocation = (location) => locationModel.create(location);