import express, { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';



const verifyAuthToken = (req: Request, res: Response, next: express.NextFunction) => {
    
    const secretToken = process.env.TOKEN_SECRET as string;
    
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, secretToken) as JwtPayload;   
        next();        
    } catch (error) {
        res.status(401).json('Access denied');
    }
}

export default verifyAuthToken;