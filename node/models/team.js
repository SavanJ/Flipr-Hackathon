const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Team = mongoose.model('Team', {
    teamName : {type: String},
    lists:[{
        cardName : {type:String},
        cardNumber : {type:Number},
        cards:{type:Object}
    }],
    members:{type:Object}
});

module.exports = { Team };