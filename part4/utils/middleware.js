const jwt = require('jsonwebtoken');

const errorhandler = (err,req,res,next)=>{
    res.status(400).send(err.message);
    next();
};



const tokenExtractor = (req,res,next)=>{
    const auth = req.get('authorization');
    if(auth && auth.toLowerCase().startsWith('bearer')){
        const token = auth.substring(7);
        req.token = token;
    }else{
        req.token = false;
    }
    next();
};

const userExtractor = (req,res,next)=>{

    const auth = req.get('authorization');
    if(auth && auth.toLowerCase().startsWith('bearer')){
        const token = auth.substring(7);
        const decodedToken = jwt.decode(token);
        req.user = decodedToken.username;
    }else{
        req.token = false;
    }
    next();
};

module.exports = {
    errorhandler,
    tokenExtractor,
    userExtractor,
};