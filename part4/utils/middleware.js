const errorhandler = (err,req,res,next)=>{
    res.send('error');
    next();
};

module.exports = {
    errorhandler,
};