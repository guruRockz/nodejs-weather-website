
const path = require("path")
const hbs = require("hbs")
const express = require("express")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirPath = path.join(__dirname,"../public")
const veiwsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlers engine and views location - hbs was installed with npm
app.set("view engine","hbs")
app.set("views",veiwsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get("",(req,res) => {
    //Resource render by passing values to hbs
    res.render("index",{
        title:"Home",
        name: "Guru"
    })
})

app.get("/about",(req,res) => {
    res.render("about",{
        title:"About me",
        name:"Guru"
    })
})

app.get("/help",(req,res) => {
    res.render("help",{
        help:"This is some helpful text",
        title:"Help Page",
        name:"Guru"
    })
})


// app.get("/help",(req,res)=>{
//     res.send({
//         name: "Andrew",
//         age:27
//     })
// })

app.get("/about",(req,res)=>{
    res.send("<h2>About page</h2>")
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address is must"
        })
    }
    
    geocode(req.query.address,(error, {latitude, longitude,location} = {}) =>{
        if(error){
            return res.send({error})
        }
        /*res.send({
            location:"Bengaluru",
            forecast: "Rainy day",
            address: req.query.address
        })*/
        forecast(latitude,longitude, (error, details) => {
            if(error){
                return res.send({error})
            }
            console.log(details)
            res.send({
                location,
                forecast: details
            })
        })
    })

})

app.get("/products",(req,res)=>{
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error:"Search term is must"
        })
        
    }
    res.send({
        products : []
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404page",{
        title:"404: page not found",
        errorMsg:"Help Page Not Found!!!",
        name: "Guru"
    })
})

app.get("*",(req,res)=>{
    res.render("404page", {
        title:"404: Page not found",
        errorMsg:"Page Not Found!!!",
        name:"Guru"
    })
})

app.listen(port, ()=>{
    console.log("Server is up on port" + port)
})