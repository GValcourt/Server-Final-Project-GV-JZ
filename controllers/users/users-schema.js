import mongoose from 'mongoose';


const schema = mongoose.Schema({
  username: String,
  usertype: String,
  first_name: String,
  last_name: String,
  password: String, //If this were a live system, I would use encryption
  likes: [String], //Might make this an ObjectId
  follows: [{type: mongoose.Schema.Types.ObjectId, Model:'LocationModel'}]
}, {collection: 'articles', versionKey: false });
export default schema;