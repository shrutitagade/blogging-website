import { EventEmitter } from 'events';

// Set the default max listeners globally (increase the limit)
EventEmitter.defaultMaxListeners = 20; // You can increase this value as neededt
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, './.env');

// Load the .env file
dotenv.config({ path: envPath });

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use((req, res, next) => {
    req.setTimeout(600000);  // 10 minutes
    next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//MongoDb connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));
