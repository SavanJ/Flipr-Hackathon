const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', {
    username : {type: String},
    email : {type: String},
    password : {type: String},
});

module.exports = { User };