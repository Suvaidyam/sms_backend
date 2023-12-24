import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'LMS';

const verifyToken = (req: any, res: any, next: NextFunction): void => {
    // console.log('hii', req.user);
    const token = req.header('token');
    // console.log('token', token);
    if (!token) {
        return res.status(401).json({ message: 'Token not available' });
    }
    try {
        const decoded: any = jwt.verify(token, SECRET_KEY); // Replace with your secret key
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Access denied. Invalid token' });
    }
};

export  default  verifyToken ;
