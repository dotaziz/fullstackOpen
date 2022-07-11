const errorhandler = (err,req,res,next)=>{
    res.send(err.message);
    next();
};

module.exports = {
    errorhandler,
};