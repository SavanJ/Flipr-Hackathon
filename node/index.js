const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
const mongoose = require('mongoose');
const dataRoutes = require('./routes/dataAuth');

mongoose.connect( 'mongodb://localhost:27017/Hackathon' , {
})
	.then(() => console.log('Hackathon connected'))
    .catch(err => console.log('not connected' + err));
    
app.use(bodyParser.json());
app.use(cors({ 
    origin: 'http://localhost:4200',
    credentials: true, // please write this because it will kept the session
 }));


// app.use(homeRoutes)
app.use(dataRoutes)

app.listen(3000, () => console.log('Server started at port : 3000'));