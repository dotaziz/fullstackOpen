const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');
require('express-async-errors');

blogsRouter.get('/',(req,res,next)=>{
    Blog.find({}).populate('user').then((blogs)=>{
        res.json(blogs);
    }).catch(err=>{
        next(err);
    });
});

blogsRouter.post('/',async(req,res,next)=>{
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
            res.status(201).json(result);
        }).catch(err=>{
            next(err);
        });
});

blogsRouter.delete('/:id',async (req,res)=>{
    console.log(req.params.id);

    const remove = await Blog.findByIdAndDelete(req.params.id);
    if(remove.$isDeleted !== null ){
        res.status(204).json('success');
    }

    res.status(400).json({'error':'content not found'});
});


blogsRouter.put('/:id',async (req,res)=>{
    const update = await Blog.findByIdAndUpdate(req.params.id,{'likes':req.body.likes},{new:true});
    if(update.isModified) {
        res.status(204).json('success');
    }

    res.status(400).json({'error':'content not found'});
});


module.exports = blogsRouter;