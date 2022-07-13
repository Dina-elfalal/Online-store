import supertest from 'supertest';

import app from '../../server';

import { Product } from '../../models/product';

import jwt, { JwtPayload } from 'jsonwebtoken';

import { User } from '../../models/user';

const request = supertest(app);


describe('testing (/products) Route', () => {

    const secretToken = process.env.TOKEN_SECRET as string;

    const productTest: Product = {
        name: 'Hershman HD LED TV 24 inch',
        description: 'These items are shipped from and sold by different sellers',
        price: '250.00',
        category: 'TV'
    }

    const userTest: User = {
        user_name: 'Yasso',
        first_name: 'Yassin',
        last_name: 'Mostafa',
        password_digest: '123456'
    }

    let productId: number;
    let token: string;
    let decoded: JwtPayload;
    

    beforeAll( async () => {
        await request.post('/users')
            .send(userTest)
            .expect(200)
            .then((res) => {

                token = res.body;
                decoded = jwt.verify(token, secretToken) as JwtPayload;
                
            expect(decoded.user.first_name).toEqual(userTest.first_name);
        });
    });

    it('it should test create endpoint with valid user', async () => {
        await request.post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send(productTest)
            .expect(200).then((res) => {
            
            productId = res.body.id;
            expect(res.body.name).toEqual(productTest.name);
        });
    });

    it('it should test create endpoint with invalid user', async () => {
        await request.post('/products')
            .send(productTest)
            .expect(401)
            .then((res) => {

            expect(res.text).toContain("Access denied");
        });
    });

    it('it should test index endpoint', async () => {
        await request.get('/products')
            .expect(200)
            .then((res) => {

            expect(res.body).toContain({id: productId,...productTest});
        });
    });

    it('it should test show endpoint', async () => {
        await request.get(`/products/${productId as number}`)
            .expect(200)
            .then((res) => {

            expect(res.body).toEqual({id: productId ,...productTest});
        });
    });

    it('it should test show product by category endpoint', async () => {
        await request.get(`/products?category=${productTest.category as string}`)
            .expect(200)
            .then((res) => {

                expect(res.body).toContain({ id: productId , ...productTest })
            });
    });

    it('it should test update endpoint with valid user', async () => {
        await request.put('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
            id: productId,
            name: 'Hershman Mobile',
            description: 'These items are shipped from and sold by different sellers',
            price: '200.00',
            category: 'Mobile'
            }).expect(200)
            .then((res) => {

            expect(res.body).toEqual({
                id: productId,
                name: 'Hershman Mobile',
                description: 'These items are shipped from and sold by different sellers',
                price: '200.00',
                category: 'Mobile'
            });
        });
    });

    it('it should test delete endpoint and return true', async () => {
        await request.delete(`/products/${productId as number}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    afterAll( async () => {
        await request.delete(`/users/${decoded.user.id as number}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});

