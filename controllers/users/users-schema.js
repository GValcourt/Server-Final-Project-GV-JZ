import mongoose from 'mongoose';

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    user_type: String,
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: String,
    bio: String,
    avatar: String,
    reviewNum: Number,

}, {collection: 'users'});

export default schema;
