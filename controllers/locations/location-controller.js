import * as locationDao from "./location-dao.js"



const findLocationbyPlaceID = async (req, res) => {
    let id = req.params.uid
    let location = await locationDao.findLocationbyPlaceID(id)
    res.json(location)
}


const LocationController = (app) => {
    app.get('/api/locations/:uid', findLocationbyPlaceID);
}

export default LocationController;