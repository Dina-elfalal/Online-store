import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

import verifyAuthToken from '../middleware/verify';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        return res.json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id);
        const product = await store.show(productId);
        return res.json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        }

        const newProduct = await store.create(product);
        return res.json(newProduct);
    } catch(err) {
        return res.status(500).json(err);
    }
}

const showCategory = async (req: Request, res: Response) => {
    try {
        const category = String(req.query.category)
        const productCategory = await store.showCategory(category);
        return res.json(productCategory);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

const update = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        }
        
        const updateProduct = await store.update(product);
        
        return res.send(updateProduct);
        
    } catch (error) {
        return res.status(500).json(error);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await store.delete(id);
        return res.json(deleted);
    } catch (error) {
        return res.status(500).json(error);
    }
}


const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.get('/products', showCategory);
    app.put('/products', verifyAuthToken, update);
    app.delete('/products/:id', verifyAuthToken, destroy);
    
}

export default productRoutes;

