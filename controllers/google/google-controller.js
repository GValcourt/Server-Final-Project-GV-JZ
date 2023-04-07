

const GoogleController = (app) => {
    app.post('/api/google/check', checkLocationValidity)
    app.post('/api/google/locations', getLocationOptions)
    app.get('/api/google/locations/:uid', getDetailsOfPlace)
}


//Converts a location string into a formatted url in order to collect the lat and long for storage
export async function getLocationFromURL (location) {
    //console.log(location)
    let url = location.replace(' ', '%20');
    let response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${url}\
    &inputtype=textquery&fields=formatted_address%2Cname%2Cgeometry%2Cprice_level%2Cplace_id&key=AIzaSyBq6A5uqteMK_iK8T-d8YlMFmCw3CyQCWA`);
  
    //console.log(response)
    if (response.ok) {
      let jsonObj = await response.json();
  
      //console.log(jsonObj.candidates[0])
      return jsonObj
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }


//Gets details about a place from google maps place id
export async function getPlaceDetails (place_id) {
    //console.log(place_id)
    let response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=AIzaSyBq6A5uqteMK_iK8T-d8YlMFmCw3CyQCWA`);
  
    //console.log(response)
    if (response.ok) {
      let jsonObj = await response.json();
  
      //console.log(jsonObj.candidates[0])
      return jsonObj
    } else {
      alert("HTTP-Error: " + response.status);
    }
}

//gets details about many places from a search query
export async function getTextSearch (searchInfo) {
  //console.log(searchInfo)
  let response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchInfo}&key=AIzaSyBq6A5uqteMK_iK8T-d8YlMFmCw3CyQCWA`);

  //console.log(response)
  if (response.ok) {
    let jsonObj = await response.json();

    //console.log(jsonObj.candidates[0])
    return jsonObj
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

//returns the call of a waiting getLocationFromURL
const checkLocationValidity = async (req, res) => {
    //console.log(req.body)
    const testObj = req.body;
    const value = await getLocationFromURL(testObj.locationName)
    //console.log(value)
    res.json(value)
  }

//returns the call of a waiting getLocationOptions
const getLocationOptions = async (req, res) => {
  //console.log(req)
  const testObj = req.body;
  const value = await getTextSearch(testObj.query)
  //console.log(value)
  res.json(value)
}


//for testing, may delete later
const getDetailsOfPlace = async (req, res) => {
  const place_id = req.params.uid;
  //console.log(req.params)
  const value = await getPlaceDetails(place_id)
  //console.log(value.result.geometry.location.lat)
  res.json(value)
  }
  

export default GoogleController