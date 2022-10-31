const path = require("node:path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()

//
// Use Heroku provided PORT or default to 3000
//
const port = process.env.PORT || 3000

// console.log("__dirname:", __dirname)
// console.log("__filename:", __filename)

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//
// Routes
//

// localhost:3000
app.get("", (req, res) => {
     res.render("index", {
        title: "Weather",
        name: "David Lazarony"
     })
})

// localhost:3000/about
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Weather",
        name: "David Lazarony"
    })
})

// localhost:3000/products
app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// localhost:3000/weather?address=myAddress
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }

    console.log(req.query)
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
//        console.log(location)
            
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

//            console.log(data)
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        });
    });
})

// localhost:3000/help
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Weather Help",
        name: "David Lazarony",
        message: "Welcome to the Weather App!  Here is some information to get you started..."
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
         title: "Weather Help Error",
         name: "David Lazarony",
         errorMessage: "Help Article Not Found!"
    })
})

// localhost:3000/<unknown>
app.get("*", (req, res) => {
    res.render("404", {
        title: "Weather Page Error",
        name: "David Lazarony",
        errorMessage: "Error: 404. Page Not Found!"
   })
})


// localhost:3000
// app.get("", (req, res) => {
//     res.send("<h1>Weather<h1>")
// })

// localhost:3000/about
// app.get("/about", (req, res) => {
// //    res.send('<h2>About Myself!<h2>')
//     res.send('<svg width="100" height="100"><circle r="20" cx="50" cy="20" fill="blue"/><svg>')
// })

// localhost:3000/help
// app.get("/help", (req, res) => {
//     res.send({
//         name: "David",
//         age: 27
//     })
// })

// localhost:3000/weather
app.get("/weather", (req, res) => {
    res.send({
        forecast: "Sunny, with a chance of showers.",
        location: "Timbuktu"
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})