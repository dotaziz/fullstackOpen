const errorhandler = (err,req,res,next)=>{
    res.status(400).send(err.message);
    next();
};

module.exports = {
    errorhandler,
};