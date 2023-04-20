
const schema = mongoose.Schema({
  username: String,
  usertype: String,
  first_name: String,
  last_name: String,
  password: String, //If this were a live system, I would use encryption
  likes: [String], //Might make this an ObjectId
  follows: [{type: mongoose.Schema.Types.ObjectId, Model:'LocationModel'}],
  avatar: String, //stored in firebase
  bannerPicture: String, //stored in firebase
  bio: String, //long
  website: String,
  location: String,
  dateJoined: String, //date?
  reviewNum: String //would int be better?
}, {collection: 'articles', versionKey: false });//versionKey=true makes an extra object in the database
export default schema;