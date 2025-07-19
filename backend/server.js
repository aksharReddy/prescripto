import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import cloudinaryConfig from './config/cloudinary.js';
import adminRouter from './routes/adminroute.js';
import doctorRouter from './routes/doctorroute.js';
import userRouter from './routes/userroute.js';

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
cloudinaryConfig();

app.use(express.json());
app.use(cors());

app.use('/api/admin', adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user', userRouter);
app.get('/', (req, res) => {
    res.send('Welcome to Prescripto API ye');
}) 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});