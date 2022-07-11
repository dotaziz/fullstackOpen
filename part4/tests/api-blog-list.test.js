const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('equal length', () => {
    test('verify if blog list in equal to database list',async () =>{
        const request = await api.get('/api/blogs');
        
        expect(request.body).toHaveLength(24);

        // this test will fail since the length of database is not 24 as it keeps changing.
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
        blog.likes = 0;
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

    test('bad request if title && url is empty',async ()=>{
        delete blog.title;
        delete blog.url;

        await api.post('/api/blogs').send(blog).expect(400); 
    },10000);
});

describe('delete from db',()=>{

    // change id after operation --- otherwise test will fail
    let id = '62ccaaced84f31dde5ac9d0b';

    test('return 204 after blog removed',async()=>{
        await api.delete(`/api/blogs/${id}`).expect(204);
    },1000);

    let fakeId = 'lkdjlkjeoi3u40983030990';

    test('if blog not found',async()=>{
        await api.delete(`/api/blogs/${fakeId}`).expect(400);
    },1000);
});

describe('edit db',()=>{
    let id = '62cc8f9edec8c1278f57dd5d';
    
    test('return 204 after blog edit',async()=>{
        await api.put(`/api/blogs/${id}`).send({
            'likes':10
        }).expect(204);
    },1000);

    let fakeId = 'lkdjlkjeoi3u40983030990';

    test('if not found',async()=>{
        await api.put(`/api/blogs/${fakeId}`).send({
            'likes':20
        }).expect(400);
    },1000);

});

afterAll(()=>{
    mongoose.connection.close();
});