import mongoose from "mongoose"

//Schema for the objects in the location array
const LocationSchema = mongoose.Schema({
    locationName : String,
    placeID : String
}, { versionKey: false })
export default LocationSchema