import express from 'express';
const app = express();
const port = process.env.PORT || 5000;
import publicRoutes from './routes/publicRoutes'
import usersRoutes from './routes/usersRoutes'
import admin from './routes/adminRoutes'
const db = require('./config/db');
import cors from 'cors';
import bodyParser from 'body-parser';


//Cho phép truy cập vào trực tiếp thư mục public bằng url
app.use(express.static('public'));



app.listen(port, () => {
    console.log(`Moi ban truy cap vao: http://localhost:${port}`)
})

const corsOrigin = {
    origin: process.env.CONNECT_FRONTEND,//or whatever port your frontend is using
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOrigin));







// Middleware để xử lý dữ liệu từ form HTML
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// Middleware để xử lý dữ liệu JSON api
app.use(bodyParser.json({ limit: '50mb' }))

app.use('/', publicRoutes);
app.use('/users', usersRoutes);
app.use('/admin', admin);