import express from 'express';
const app = express();
const port = process.env.PORT || 5000;
import publicRoutes from './routes/publicRoutes'
import usersRoutes from './routes/usersRoutes'
import admin from './routes/adminRoutes'
const db = require('./config/db');
import cors from 'cors';



app.listen(port, () => {
    console.log(`Moi ban truy cap vao: http://localhost:${port}`)
})

const corsOrigin = {
    origin: 'http://localhost:3000', //or whatever port your frontend is using
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOrigin));







// Middleware để xử lý dữ liệu từ form HTML
app.use(express.urlencoded({ extended: true }));

// Middleware để xử lý dữ liệu JSON api
app.use(express.json());

app.use('/', publicRoutes);
app.use('/users', usersRoutes);
app.use('/admin', admin);