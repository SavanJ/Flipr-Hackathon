const express = require('express');
var router = express.Router()
const dataController = require('../controllers/dataController')
var jwt = require('jsonwebtoken');

// router.post('/auth', authController.addProduct);
// router.get('/addToCart/:id',authController.addToCart);

router.post('/getLists', dataController.getLists);
router.put('/insert', dataController.insert);
router.post('/create', dataController.create);

// Team
router.post('/newTeam', dataController.newTeam);
router.post('/getTeam', dataController.getTeam);
router.post('/addMember', dataController.addMember);

// TeamDetail

router.post('/getTeamDetail', dataController.getTeamDetail);
router.post('/createTeamList', dataController.createTeamList);
router.post('/insertCardIntoList', dataController.insertCardIntoList);

// Auth Service

router.post('/register', dataController.register);
router.post('/login', dataController.login);

function verify(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token =  req.headers.authorization.split(' ')[1];
    if(token == 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token , 'savan')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    var name = payload.name;
    // console.log(payload,token)
    // req.user = name
    res.json(name)
    // next()  
}
router.get('/getUsername', verify);

module.exports = router;

