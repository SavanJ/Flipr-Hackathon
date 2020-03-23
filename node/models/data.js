const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = mongoose.model('Data', {
    // name: 
    // { 
    //     english : {type: String},
    //     hindi : {type: String},
        // gujarati : {type: String},
    // },
    email : {type: String},
    password : {type:String},
    username : {type:String},
    team:[{
        teamName : {type:String},
        teamId : {type:Schema.Types.ObjectId}
    }],
    lists:[{
        cardName : {type:String},
        cardNumber : {type:Number},
        cards:{type:Object}
    }]
});

module.exports = { Product };