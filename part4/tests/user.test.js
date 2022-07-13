const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const db_initial_length = api.get('/api/users');

describe('create user account',()=>{
    const data = {
        username: 'certyfreak',
        password: '123456',
        name: 'jan doe'
    };
    test('reject if username/name/password is empty',async()=>{
        delete data.username;
        let request = await api.post('/api/users/').send(data)
            .expect(400);
            
        expect(request.body.error).toBe('username is required');
        data.username = 'certyfreak';
        delete data.password;

        request = await api.post('/api/users/').send(data)
            .expect(400);
        
        expect(request.body.error).toBe('password is required');

        data.password = '123456';
        delete data.name;
        
        request = await api.post('/api/users/').send(data)
            .expect(400);
        
        expect(request.body.error).toBe('name is required');
        let response = await api.get('/api/users/');
        expect(response.body.length).toHaveLength(db_initial_length.length);

    },10000);

    test('reject when password/username less than 3',async ()=>{
        data.password = '123';
        let request = api.post('/api/users').send(data)
            .expect(400);
        
        expect(request.body.error).toBe('username should be greater than 3');

        data.password = '123456';
        data.username = 'cer';

        request = api.post('/api/users').send(data)
            .expect(400);

        expect(request.body.error).toBe('password should be greater than 3');

        let response = await api.get('/api/users/');
        expect(response.body.length).toHaveLength(db_initial_length);
        
    });

    // test('reject if password is empty',async()=>{
    //     delete data.password;
    //     const request = await api.post('/api/users')
    // },10000);
});

afterAll(()=>{
    mongoose.connection.close();
});