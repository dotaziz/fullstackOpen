const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');

loginRouter.post('/',async (req,res)=>{
    const {username, password } = req.body;

    const userVerify = await User.findOne({username});

    if(!userVerify){
        return res.status(400).json({
            error: 'user name is invalid'
        });
    }

    const passwordVerify = bcrypt.compare(password,userVerify.passwordHashed);

    if(!passwordVerify){
        return res.status(400).json({
            error: 'password is invalid',
        });
    }

    const user = {
        userVerify,
        passwordVerify,
    };

    const token = jwt.sign(user,process.env.SECRET);

    return res.status(200).json({
        token
    });


});

module.exports = loginRouter;