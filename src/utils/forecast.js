const request  = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url="http://api.weatherstack.com/current?access_key=2c9f110e541a7fbdc366da0b0e634e71&query=" + longitude + "," + latitude + "&units=m"
    request({url, json:true},(error,{body}) => {
        if(error){
            callback("Unable to connect to weather services!!!", undefined) 
        } else if(body.error){
            callback("Unable to find location!!!", undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently "+ body.current.temperature + " degrees out. There is a " + body.current.precip +"% chance of rain. The humidity is " + body.current.humidity+"%.")
        }
    })
}

module.exports = forecast