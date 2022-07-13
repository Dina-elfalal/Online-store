import express, { Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
    try {
        const products = await dashboard.productsInOrders();
        return res.json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

const usersWithOrders = async (_req: Request, res: Response) => {

    try {
        const users = await dashboard.usersWithOrders();
        return res.json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

const fiveMostExpensive = async (_req: Request, res: Response) => {

    try {
        const users = await dashboard.fiveMostExpensive();
        return res.json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}


const topProducts = async (_req: Request, res: Response) => {

    try {
        const products = await dashboard.topProducts();
        return res.json(products);
    } catch (error) {
        return res.status(500).json(error);
    }    
}

const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_orders', productsInOrders);
    app.get('/users-with-orders', usersWithOrders);
    app.get('/five-most-expensive', fiveMostExpensive);
    app.get('/top-five', topProducts);
}

export default dashboardRoutes;