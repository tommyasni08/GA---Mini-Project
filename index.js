// Import Modules
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors') //Enable cors request

app.use(cors())

// Import Routes
const homeRoutes = require('./routes/homeRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const movieRoutes = require('./routes/movieRoutes.js')

// Parsing the body of incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Static files
app.use(express.static('public'))

// Connect the routes with
app.use('/home', homeRoutes)
app.use('/category',categoryRoutes)
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);


// Listen to port 3000
app.listen(3000,()=> console.log("server running on http://localhost:3000"));

module.exports = app;
