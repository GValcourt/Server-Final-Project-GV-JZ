import mongoose from 'mongoose';
import userSchema from './users-schema.js'
const usersModel = mongoose
    .model('UsersModel', userSchema, "users");
export default usersModel;