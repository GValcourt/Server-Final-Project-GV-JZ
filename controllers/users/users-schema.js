import mongoose from 'mongoose';
import user_type from './user-types'

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    user_type: user_type,
    username: String
}, {collection: 'users'});

export default schema;
