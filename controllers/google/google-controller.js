

const GoogleController = (app) => {
    app.post('/api/articles/google/check', checkLocationValidity)
}


export async function getLocationFromURL (location) {
    let url = location.replace(' ', '%20');
    let response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${url}\
    &inputtype=textquery&fields=formatted_address%2Cname%2Cgeometry%2Cprice_level%2Cplace_id&key=AIzaSyBq6A5uqteMK_iK8T-d8YlMFmCw3CyQCWA`);
  
    //console.log(response)
    if (response.ok) {
      let jsonObj = await response.json();
  
      //console.log(jsonObj.candidates[0])
      return jsonObj.candidates[0]
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }
  
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



const checkLocationValidity = async (req, res) => {
    //console.log(req.body)
    const testObj = req.body;
    const value = await getLocationFromURL(testObj.locationName)
    const sending = {name : value.name, formatted_address: value.formatted_address}
    //console.log(sending)
    res.json(sending)
  }

//for testing, may delete later
export async function checkReviews(place_id){
    //console.log()
    let value = await getPlaceDetails(place_id)
    return value.result
  }
  

export default GoogleController