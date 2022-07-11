const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
require('express-async-errors');

blogsRouter.get('/',(req,res,next)=>{
    Blog.find({}).then((blogs)=>{
        res.json(blogs);
    }).catch(err=>{
        next(err);
    });
});

blogsRouter.post('/',(req,res,next)=>{
    
    if(!req.body.likes){
        req.body.likes = 0;
    }
    if(!req.body.url && !req.body.title){
        res.status(400).json({
            'error':'bad request'
        });
    }
    const blog = new Blog(req.body);
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

module.exports = blogsRouter;