const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
require('express-async-errors');
const User = require('../models/users');
const jwt = require('jsonwebtoken');


userRouter.get('/',async(req,res,)=>{

    const users = await User.find({});

    return res.status(200).json(users);

});

userRouter.post('/', async (req,res)=>{

    const {username,password, name} = req.body;

    if(!username){
        return res.status(400).json({error:'username is required'});
    }
    if(!password){
        return res.status(400).json({error:'password is required'});
    }

    if(!name){
        return res.status(400).json({error:'name is required'});
    }

    if(username.lenth < 3){
        return res.status(400).json({error:'username should be greater than 3'});
    }

    if(password.lenth < 3){
        return res.status(400).json({error:'password should be greater than 3'});
    } 

    if(User.find({ username })){
        return res.status(400).json({error:`username is must be unique,${username} already in system `});
    }

    const token = jwt.sign({
        username,
        password
    },process.env.SECRET);

    const salt = await bcrypt.genSalt(10);

    const passwordHashed = await bcrypt.hash(password,salt);
    
    const user = new User({
        name,
        username,
        passwordHashed,
    });

    const result = await user.save();

    res.status(200).json({
        result,
        token,
    });        // return res.json(req.body);
});

module.exports = userRouter;