import express, { Request, Response } from 'express';

import fs from 'fs';


const logger = (req: Request, res: Response, next: express.NextFunction) => {
    const current_datetime = new Date();
    const formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
    
    const method = req.method;

    const url = req.url;

    const status = res.statusCode;

    const log = `[${formatted_date}] ${method}:${url} ${status}`;

    console.log(log);

    fs.appendFile("request_logs.txt", log + "\n", err => {
        if (err) {
            console.log(err);
        }
    });

    next();
};

export default logger;