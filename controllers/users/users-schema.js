import mongoose from 'mongoose';
import user_type from './user-types.js'

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    user_type: {type: String, enum: user_type, default: "reviewer"},
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }, //If this were a live system, I would use encryption
    email: String,
    avatar: String, //stored in firebase
    bannerPicture: String, //stored in firebase
    bio: String, //long
    website: String,
    location: String,
    dateJoined: String, //date?
    reviewNum: Number, //would int be better?
    business: String
}, {collection: 'users'});

export default schema;