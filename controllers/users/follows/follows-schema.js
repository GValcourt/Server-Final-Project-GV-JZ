import mongoose from 'mongoose';


const schema = mongoose.Schema({
  follower: {type: mongoose.Schema.Types.ObjectId, Model:'UsersModel'},
  followed: {type: mongoose.Schema.Types.ObjectId, Model:'UsersModel'},
}, {collection: 'follows', versionKey: false });
export default schema;