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

afterAll(()=>{
    mongoose.connection.close();
});