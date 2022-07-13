import supertest from 'supertest';

import app from '../../server';

import { User } from '../../models/user';

import jwt, { JwtPayload } from 'jsonwebtoken';

const request = supertest(app);

describe('testing (/users) Route', () => {

    const secretToken = process.env.TOKEN_SECRET as string;

    const userTest: User = {
        user_name: 'mm',
        first_name: 'tt',
        last_name: 'ss',
        password_digest: '748'
    }

    let token: string;
    let decoded: JwtPayload;

    it('it should test create endpoint ', async () => {
        await request.post('/users')
            .send(userTest)
            .expect(200)
            .then((res) => {
            
            token = res.body;
            decoded = jwt.verify(token, secretToken) as JwtPayload;
            expect(decoded.user.user_name).toEqual(userTest.user_name);
        });
    });

    it('it should test authenticate endpoint and return true', async () => {
        await request.post('/users/authenticate')
            .send(userTest)
            .expect(200);
    });

    it("it should test authenticate endpoint return 'Invalid User'", async () => {
        await request.post('/users/authenticate')
            .send({
            user_name: 'ss',
            first_name: 'oo',
            last_name: 'pp',
            password_digest: 'green'
            }).expect(401)
            .then((res) => {

            expect(res.text).toEqual('Invalid User');
        });
    });

    

    it('it should test show endpoint and return true', async () => {
        await request.get(`/users/${decoded.user.id as number}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {

            expect(res.body).toEqual(decoded.user);
        });
    });

    it('it should test index endpoint and return true', async () => {
        await request.get('/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {

            expect(res.body).toContain(decoded.user);
        });
    });


    it("it should test update endpoint return true to updated user", async () => {
        await request.put('/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
            id: decoded.user.id,
            user_name: decoded.user.user_name,
            first_name: decoded.user.first_name,
            last_name: 'Sally',
            password_digest: decoded.user.password_digest
            }).expect(200)
            .then((res) => {

                const newToken: string = res.body;
                const decodedUpdate = jwt.verify(newToken as string, secretToken) as JwtPayload;
                expect(decodedUpdate.user.last_name).toEqual('Sally');
                
        });
    });

    it('it should test delete endpoint and return true', async () => {
        await request.delete(`/users/${decoded.user.id as number}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });

});
    
