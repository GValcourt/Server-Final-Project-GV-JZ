import mongoose from 'mongoose';
import followSchema from './follows-schema.js'
const followsModel = mongoose.model('FollowsModel', followSchema, "follows");
export default followsModel;