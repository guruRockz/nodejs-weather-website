request = require("postman-request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaW5maWd1bmEiLCJhIjoiY2tqbGM1emliMDcxczJ5dGZodmhoamUydiJ9.XHVK66v8_3UeQe_gMLBBgg&limit=1"
    request({url, json:true},(error, {body})=>{
        if(error) {
            callback("Unable to connect to location services!!!", undefined)
        } else if(body.features.length === 0){
            callback("Unable to find location. Try another search", undefined)
        } else{
            cords = 
            callback(undefined, {
                latitude: body.features[0].center[1],
                longiture:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode