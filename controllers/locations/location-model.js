import mongoose from 'mongoose';
import locationSchema from './location-schema.js'
const LocationModel = mongoose
              .model('LocationModel', locationSchema, "locations");
export default LocationModel;