import express from 'express';
const app = express();
const port = process.env.PORT || 5000;
import publicRoutes from './routes/publicRoutes'
import usersRoutes from './routes/usersRoutes'
import admin from './routes/adminRoutes'
const db = require('./config/db');
import cors from 'cors';
import bodyParser from 'body-parser';
const { Server } = require("socket.io");


const staticAllowedOrigins = [
    'https://buitantoan.xyz',
    process.env.CONNECT_FRONTEND
];

const server = app.listen(port, () => {
    console.log(`Moi ban truy cap vao: http://localhost:${port}`)
})


const corsOrigin = {
    origin: staticAllowedOrigins,//or whatever port your frontend is using
    credentials: true,
    optionSuccessStatus: 200
}

const io = new Server(server, {
    cors: corsOrigin
})


//Cho phép truy cập vào trực tiếp thư mục public bằng url
app.use(express.static('public'));


app.use(cors(corsOrigin));


io.on("connection", (socket) => {
    console.log(` User connected: ${socket.id}`)

    socket.on("send-message", (data) => {
        console.log(data)
        io.sockets.to(data.roomName).emit("server-chat", {
            lastName: data.lastName,
            firstName: data.firstName,
            contents: data.contents,
            idUsers: data.idUsers
        })


    })

    socket.on("tham-gia-phong", (data) => {
        socket.join(data)
        console.log('phong hien tai', socket.adapter.rooms)

    })


})






// Middleware để xử lý dữ liệu từ form HTML
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// Middleware để xử lý dữ liệu JSON api
app.use(bodyParser.json({ limit: '50mb' }))

app.use('/', publicRoutes);
app.use('/users', usersRoutes);
app.use('/admin', admin);