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

    username? null : res.status(400).json({error:'username is required'}).end();

    password ? null : res.status(400).json({error:'password is required'}).end();

    name ? null : res.status(400).json({error:'name is required'}).end();

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