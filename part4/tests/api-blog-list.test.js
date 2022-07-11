const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test.only('verify if blog list in equal to database list',async () =>{
    const request = await api.get('/api/blogs');
    console.log(request.body);
    
    expect(request.body).toHaveLength(5);
},10000);

afterAll(()=>{
    mongoose.connection.close();
});