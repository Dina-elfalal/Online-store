import supertest from 'supertest';

import jwt, { JwtPayload } from 'jsonwebtoken';

import app from '../../server';

import { Product } from '../../models/product';

import { User } from '../../models/user';

const request = supertest(app);


describe('testing (/orders) Route', () => {

    const secretToken = process.env.TOKEN_SECRET as string;

    const productTest: Product = {
        name: 'Hisense LED 7 inch',
        description: 'These items are shipped from and sold by different sellers',
        price: '400.00',
        category: 'Tablet'
    }

    const userTest: User = {
        user_name: 'Miko',
        first_name: 'Hussin',
        last_name: 'Ali',
        password_digest: 'qwer'
    }

    let product_id: number;
    let order_id: number;
    let token: string;
    let userId: number;
    let decoded: JwtPayload;
    

    beforeAll( async () => {
        await request.post('/users')
            .send(userTest)
            .expect(200)
            .then((res) => {

                token = res.body;
                decoded = jwt.verify(token, secretToken) as JwtPayload;
                userId = decoded.user.id;
            expect(decoded.user.first_name).toEqual(userTest.first_name);
            });
        
        await request.post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send(productTest)
            .expect(200).then((res) => {
            
            product_id = res.body.id;
            expect(res.body).toEqual({id: product_id ,...productTest});
            });
    });

    it('it should test create order endpoint with valid user', async () => {
        await request.post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'active', user_id: userId })
            .expect(200)
            .then((res) => {

                order_id = res.body.id;
                expect(res.body).toEqual({ id: order_id, status: 'active', user_id: '1' });
            });
    });

    it('it should test create order endpoint with invalid user', async () => {
        await request.post('/orders')
            .send({ status: 'active', user_id: userId})
            .expect(401)
            .then((res) => {

            expect(res.text).toContain("Access denied");
        });
    });

    it('it should test index order endpoint', async () => {
        await request.get('/orders')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {

            expect(res.body).toEqual([{ id: order_id, status: 'active', user_id: '1'}]);
        });
    });

    it('it should test show endpoint', async () => {
        await request.get(`/orders/${order_id as number}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {

            expect(res.body).toEqual({ id: order_id, status: 'active', user_id: '1'});
        });
    });

    it('it should test add product endpoint', async () => {
        await request.post(`/orders/${order_id}/products`)
            .set('Authorization', `Bearer ${token}`)
            .send({ quantity: 3, order_id: order_id, product_id: product_id })
            .expect(200)
            .then((res) => {

                expect(res.body).toEqual({ id: 1, quantity: 3, order_id: '1', product_id: '1' });
                
            });
    });

    it('it should test update order endpoint with valid user', async () => {
        await request.put('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: order_id ,status: 'active', user_id: userId })
            .expect(200)
            .then((res) => {

            expect(res.body).toEqual({ id: order_id, status: 'complete', user_id: '1' });
        });
    });

    it('it should test completed orders by user endpoint', async () => {
        await request.get(`/orders/completedOrders/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {

            expect(res.body).toEqual([{ id: order_id, status: 'complete' }]);
        });
    });

    it('it should test delete order endpoint if the order active only return false', async () => {
        await request.delete(`/orders/${order_id as number}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(500);
    });

});