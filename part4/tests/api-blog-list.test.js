const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('equal length', () => {
    test('verify if blog list in equal to database list',async () =>{
        const request = await api.get('/api/blogs');
        console.log(request.body);
        
        expect(request.body).toHaveLength(5);
    },10000);
});


describe('identifier is name id',()=>{
    test('request data has property id',async ()=>{
        const request = await api.get('/api/blogs');
        for(const data of request.body ){
            expect(data.id).toBeDefined();
        }
    },10000);
});

describe('post to db',()=>{
    let blog = {
        'title': 'writing unit tests',
        'author': 'aziz',
        'url':'https://localhost:4200',
    };
    test('check if new blog is added',async()=>{
        const request_initial = await api.get('/api/blogs');

        await api.post('/api/blogs')
            .send(blog)
            .expect(201);

        const request = await api.get('/api/blogs');
        console.log(request.body);

        expect(request.body).toHaveLength(request_initial.body.length + 1);
        const data = request.body[request.body.length -1];
        delete data.id;
        expect(data).toEqual(blog);
    },10000);

    test('like to 0 if property not found',async ()=>{
        if(!blog.likes) blog.likes = 0;

        const request = await api.post('/api/blogs').send(blog).expect(201);

        expect(request.body.likes).toBe(0);
    });
});

afterAll(()=>{
    mongoose.connection.close();
});