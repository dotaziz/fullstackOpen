const express = require('express');
const app = express();
const {MONGODB_URI } = require('./utils/config');
const {info,error} = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const cors = require('cors');
const mongoose = require('mongoose');
const { errorhandler } = require('./utils/middleware');


info('connecting to database');
mongoose.connect(MONGODB_URI).then(()=>{
    info('database connected');
}).catch((err)=>{
    error(err);
});

app.use(cors());
app.use(express.json());

app.use('/api/login',loginRouter);
app.use('/api/blogs',blogsRouter);
app.use('/api/users',userRouter);

app.use(errorhandler);



module.exports = app;