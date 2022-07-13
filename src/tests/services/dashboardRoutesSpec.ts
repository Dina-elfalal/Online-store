import supertest from 'supertest';

import app from '../../server';

const request = supertest(app);

describe('Test Get all products endpoint responses', () => {
    it('it should success', async () => {
        const response = await request.get('/products_in_orders');
        expect(response.status).toBe(200);
    });
});


describe('Test Get all users endpoint responses', () => {
    it('it should success', async () => {
        const response = await request.get('/users-with-orders');
        expect(response.status).toBe(200);
    });
});


describe('Test Get the 5 most expensive products endpoint responses', () => {
    it('it should success', async () => {
        const response = await request.get('/five-most-expensive');
        expect(response.status).toBe(200);
    });
});

describe('Test Get Top 5 most popular products endpoint responses', () => {
    it('it should success', async () => {
        const response = await request.get('/top-five');
        expect(response.status).toBe(200);
    });
});