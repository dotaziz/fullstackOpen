const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
require('express-async-errors');

const requestToken = (req)=>{
    const auth = req.get('authorization');
    if(auth && auth.toLowerCase().startsWith('bearer')){
        return auth.substring(7);
    }
    return null;
};

blogsRouter.get('/',(req,res,next)=>{
    const token = requestToken(req);
    const decodedToken = jwt.verify(token,process.env.SECRET);
    if(!decodedToken){
        return res.status(400).json({
            error: 'token is invalid'
        });
    }
    Blog.find({}).populate('user').then((blogs)=>{
        res.json(blogs);
    }).catch(err=>{
        next(err);
    });
});

blogsRouter.post('/',async(req,res,next)=>{
    const token = requestToken(req);
    const decodedToken = jwt.verify(token,process.env.SECRET);
    if(!decodedToken){
        return res.status(400).json({
            error: 'token is invalid'
        });
    }
    if(!req.body.likes){
        req.body.likes = 0;
    }
    const {likes,title,author,url} = req.body;
    
    if(!req.body.url && !req.body.title){
        res.status(400).json({
            'error':'bad request'
        });
    }

    const user = await User.findOne({ username: 'aziz_li' });

    console.log(user);
    const blog = new Blog({
        likes,
        title,
        author,
        url,
        user: user._id
    });

    blog
        .save()
        .then(result => {
            const blogs = user.blogs;
            blogs.push(blog);
            user.blogs = blogs;
            user.save();
            res.status(201).json(result);
        }).catch(err=>{
            next(err);
        });
});

blogsRouter.delete('/:id',async (req,res)=>{
    const token = requestToken(req);
    const decodedToken = jwt.verify(token,process.env.SECRET);
    if(!decodedToken){
        return res.status(400).json({
            error: 'token is invalid'
        });
    }
    console.log(req.params.id);

    const remove = await Blog.findByIdAndDelete(req.params.id);
    if(remove.$isDeleted !== null ){
        res.status(204).json('success');
    }

    res.status(400).json({'error':'content not found'});
});


blogsRouter.put('/:id',async (req,res)=>{
    const token = requestToken(req);
    const decodedToken = jwt.verify(token,process.env.SECRET);
    if(!decodedToken){
        return res.status(400).json({
            error: 'token is invalid'
        });
    }
    const update = await Blog.findByIdAndUpdate(req.params.id,{'likes':req.body.likes},{new:true});
    if(update.isModified) {
        res.status(204).json('success');
    }

    res.status(400).json({'error':'content not found'});
});


module.exports = blogsRouter;