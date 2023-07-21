// Creating the URL
import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js'
 
const app = express();

// Using morgan to see on the console the petitions made to backend.
app.use(morgan('dev'));

// Method json for express so it can read requests from body.
app.use(express.json());

// Using the routes from auth.route.js. We establish "api" as prefix.
app.use("/api", authRoutes);

export default app;