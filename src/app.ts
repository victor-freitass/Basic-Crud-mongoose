import express, {Express} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import serviceRoutes from './routes/serviceRoutes';

const mongoConnection: string = process.env.MONGO as string

class App {
    express: Express 

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes(); 
        this.connection(); //<- 
    }

    middlewares () {
        this.express.use(express.json());
        this.express.use(cors());  
    } 

    routes () {
        this.express.use(serviceRoutes);
    } 
 
    connection () {
        mongoose.connect(mongoConnection);
    }
};

export default new App().express;