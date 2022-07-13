
import express, { Request, Response } from 'express';

import cors from 'cors';

import morgan from 'morgan';

import helmet from 'helmet';

import RateLimit from 'express-rate-limit';

import userRoutes from './handlers/userRoutes';

import productRoutes from './handlers/productRouts';

import orderRoutes from './handlers/orderRoutes';

import dashboardRoutes from './services/dashboardRoutes';

import logger from './middleware/logger';



const app: express.Application = express();

app.use(express.json());

const corsOptions = {
  origin: '*',
  credentials: true
};

app.use(cors(corsOptions));

app.use(logger);

app.use(morgan('common'));

app.use(helmet());

app.use(RateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after an hour',
    })
);

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome !');
});


userRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(port, () => {
  console.log(`sever start at: http://localhost:${port}`);
});

export default app;

