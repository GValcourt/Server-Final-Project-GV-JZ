import mongoose from 'mongoose';


const schema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, Model:'UsersModel'},
  placeID: String,
}, {collection: 'follows', versionKey: false });
export default schema;