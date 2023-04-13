import mongoose from 'mongoose';


const schema = mongoose.Schema({
  title: String,
  text: String,
  date: String,
  images: [String],
  location: [{type: mongoose.Schema.Types.ObjectId, Model:'LocationModel'}]
}, {collection: 'articles', versionKey: false });
export default schema;