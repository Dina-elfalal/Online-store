import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

import verifyAuthToken from '../middleware/verify';

const store = new OrderStore();


const addProduct = async (req: Request, res: Response) => {
    const quantity = req.body.quantity;
    const order_id = Number(req.params.id);
    const product_id = req.body.product_id;
    
    try {
        const addedProduct = await store.addProduct(quantity, order_id, product_id);
        return res.json(addedProduct);
    } catch(err) {
        return res.status(500).json(err);
    }
}

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        return res.json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
        const orderId = Number(req.params.id);
        const order = await store.show(orderId);
        return res.json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

const create = async (req: Request, res: Response) => {
    try {
        
        const order: Order = { 
            status: 'active',
            user_id: req.body.user_id
        }

        const newOrder = await store.create(order);
        return res.json(newOrder);
    } catch(err) {
        return res.status(500).json(err);
    }
}


const update = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id: req.body.id,
            status: 'complete',
            user_id: req.body.user_id
        }
        
        const updateOrder = await store.update(order);
        
        return res.send(updateOrder);
        
    } catch (error) {
        return res.status(500).json(error);
    }
};

const completedOrders = async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.params.id);
        const orders = await store.completedOrders(user_id);
        return res.json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}


const destroy = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await store.delete(id);
        return res.json(deleted);
    } catch (error) {
        return res.status(500).json(error);
    }
}


const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders/:id/products', verifyAuthToken, addProduct);
    app.post('/orders', verifyAuthToken, create);
    app.put('/orders', verifyAuthToken, update);
    app.get('/orders/completedOrders/:id', verifyAuthToken, completedOrders);
    app.delete('/orders/:id', verifyAuthToken, destroy);
    
}

export default orderRoutes;