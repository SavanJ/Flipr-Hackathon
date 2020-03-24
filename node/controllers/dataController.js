const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var {Product} = require('../models/data')
var {Team} = require('../models/team')
var {User} = require('../models/user')
var jwt = require('jsonwebtoken');

exports.getLists = (req,res,next) => {
    var name = req.body.name;
        Product.find({username : name})
        .then(docs=>{
            res.send(docs)
        })
        .catch(err=>{
            console.log(err)
        })
}
exports.insert = (req,res,next) => {
    id = req.body.id;
    value = req.body.value;
    name = req.body.name.name;
    console.log('insert',id-1,value)   
    temp = "lists" + "."+id+"."+"cards";
    // cards = cards[0].cards;
    console.log(temp)
    Product.updateOne({"lists._id":id},{ $push: {"lists.$.cards" : value} }
        )   
    .then(doc=>{
        res.send(doc)
    })
    .catch(err=>{
        console.log('--err-',err)
    })
}
exports.create = (req,res,next) => {
    var counter={};
    var arr={}
    value = req.body.newCardName;
    name = req.body.name.name;
    console.log(value,name)   
    // Product.find(
    //     {username:name},
    //     {number:1}
    // )
    // .then(doc=>{
    //     // arr = {"number":doc}
    //     console.log('number',doc[0].number)
    // })
    // Product.updateOne({number:id}, { $push: {cards : value} }, { new: true }, (err, doc) => {
    //     if (!err) { res.json(doc); }
    //     else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    // // });
    Product.aggregate([{ $match: { username: name } },{$project:{count:{$size:"$lists"}}}]).then(docs => {
        console.log(docs[0].count)
        var count = docs[0].count
            counter = 
        {
            "cardName":value,
            "cardNumber":count+1,
            "cards":[]
        }
            Product.updateOne({username : name}, { $push: {"lists" : counter} }, (err, doc) => {
            if (!err) { res.json(doc); }
            else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
        });
    })
    // Product.countDocuments().then((count) => {
    //     // counter = count + 1
    //     console.log(count);
    
    //     // console.log(counter)
    
    //     // var cardName = new Product({
    //     // name : value,
    //     // number : counter,
    //     // cards:[]
    //     // })
    //     // cardName.save((err, doc) => {
    //     //     if (!err) { res.send(doc); }
    //     //     else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
    //     // });
    // });
}

// TEAMMM------------------

exports.getTeam = (req,res,next) => {
    var name = req.body.name;
    console.log('name',name)
    Product.find({username : name})
        .then(docs=>{
            res.send(docs)
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.newTeam = (req,res,next) => {
    teamName = req.body.teamName;
    name = req.body.name.name;
    console.log(teamName)
    console.log(name,teamName)
    var team = new Team({
        teamName : teamName,
        lists : [],
        members:[]
    })
    // id = "5e75ce11f718600678850d64"
    team.save((err,doc) => {
        console.log(doc)
        value={"teamName" : teamName , "teamId" : doc._id}
        Team.updateOne({_id : doc._id}, { $push: {"members" : name} }, { new: true }, (err, doc) => {
        })
        Product.updateOne({username:name}, { $push: {"team" : value} }, { new: true }, (err, doc) => {
            if (!err) { res.json(doc); }
            else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
        });
    })

}
exports.addMember = (req,res,next) => {
    var members = req.body.member;
    var teamName = req.body.teamName;
    var teamid = req.body.teamId;
    var i,arr;
    // manthan,dhruv,aum
    var length = members.length
    value={"teamName" : teamName , "teamId" : teamid}
    // console.log(members,teamid,teamName,length)
    for(i=0;i<length;i++){
    console.log('count---',i , members[i])
    Product.updateOne({username : members[i]}, { $push: {"team" : value} }, { new: true }, (err, doc) => {
    })
    Team.updateOne({_id : teamid}, { $push: {"members" : members[i]} }, { new: true }, (err, doc) => {
    })
    }
}

// Team detail
exports.getTeamDetail = (req,res,next) => {
    teamId = req.body.teamId;
    
    Team.find({_id : teamId})
    .then((docs)=>{
        res.send(docs)
    })
    .catch((err)=>{
        console.log(err)
    })
}

exports.createTeamList = (req,res,next) => {
    newTeamCardName = req.body.newTeamCardName;
    teamName = req.body.teamName;
    console.log(newTeamCardName)

    Team.aggregate([{ $match: { teamName: teamName } },{$project:{count:{$size:"$lists"}}}]).then(docs => {
        console.log(docs[0].count)
        var count = docs[0].count
        // if(docs.length == 0){
        //     console.log('yes empty')
        //     counter = 
        //     {
        //         "cardName":newTeamCardName,
        //         "cardNumber":1,
        //         "cards":[]
        //     }
        // }
        counter = 
            {
                "cardName":newTeamCardName,
                "cardNumber":count+1,
                "cards":[]
            }
            Team.updateOne({teamName : teamName}, { $push: {"lists" : counter} }, (err, doc) => {
            if (!err) { res.json(doc); }
            else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
        });
    })

}

exports.insertCardIntoList = (req,res,next) => {
    id = req.body.id;
    value = req.body.value;
    console.log('insert',id-1,value)   
    temp = "lists" + "."+id+"."+"cards";
    // cards = cards[0].cards;
    console.log(temp)
    Team.updateOne({"lists._id" : id}, { $push: {"lists.$.cards" : value} }, { new: true }, (err, doc) => {
        if (!err) { res.json(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
}

// AUTHSERVICE

exports.register = (req,res,next) => {
    username = req.body.username;
    password = req.body.password;
    email = req.body.email;

    // console.log(username,email,password)

    const product  = new Product({
        email : email,
        password : password,
        username : username,
        team : [],
        lists : []
    })

    product.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }
        else
        {
            console.log(err)
        }
    })

}

exports.login = (req,res,next) => {
    username = req.body.username;
    password = req.body.password;
    console.log(username,password)

    Product.find({ username : username })
        .then(users => {    
            // console.log(users[0].username)
            var payload = { name : users[0].username };
            token = jwt.sign(payload , 'savan');
            // console.log('token' , users , {token} , payload)
            res.send({token})
        })  
        .catch(err => {
            console.log(err);
        })

}