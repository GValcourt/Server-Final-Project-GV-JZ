import mongoose from 'mongoose';
import likesSchema from './likes-schema.js'
const likesModel = mongoose.model('likesModel', likesSchema, "likes");
export default likesModel;