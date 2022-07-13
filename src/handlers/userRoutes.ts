import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User, UserStore } from '../models/user';

import verifyAuthToken from '../middleware/verify';

const store = new UserStore();

const secretToken = process.env.TOKEN_SECRET as string;

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        return res.json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const user = await store.show(userId);
        return res.json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}


const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password_digest: req.body.password_digest
        }

        const newUser = await store.create(user);
        var token = jwt.sign({ user: newUser }, secretToken);

        return res.json(token);
        
    } catch(err) {
        return res.status(500).json(err);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: req.body.id,
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password_digest: req.body.password_digest
        }
        
        const updateUser = await store.update(user);
        
        var token = jwt.sign({ user: updateUser }, secretToken);

        return res.json(token);
        
    } catch (error) {
        return res.status(500).json(error);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const deleted = await store.delete(userId);
        return res.json(deleted);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}


const authenticate = async (req: Request, res: Response) => {
    try {
        const user: User = {
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password_digest: req.body.password_digest
        }
        

        const checkUser = await store.authenticate(user.user_name, user.first_name, user.last_name, user.password_digest);
        if (checkUser === null) {
            return res.status(401).send('Invalid User');
        } else {
            var token = jwt.sign({ user: checkUser }, secretToken);
            return res.json(token);
        }
        
    } catch(err) {
        return res.status(401).json(err);
    }
}


const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
    app.delete('/users/:id', verifyAuthToken, destroy);
    app.post('/users/authenticate', authenticate);
    app.put('/users', verifyAuthToken, update);
}

export default userRoutes;