const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema1 = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: String,
    password: String,
    address: {
        type: String,
        default: ''
    },
    age: Number,
    role: {
        type: String,
        default: 'USERS'
    },
    gender: String,
    phoneNumber: {
        type: String,
        default: ''
    },
    avatar: Buffer,


    token: String,
    time: {
        type: Date,
        default: Date.now
    },


}, { collection: 'tiki_object' },
    { timestamps: true }
)

const Users = mongoose.model('Users', schema1);


const schema2 = new Schema({
    category: {
        type: Number,

    },
    productName: String,
    price: String,
    avatar: Buffer,
    supplier: {
        type: String,
        default: 'NONE'
    },
    description: {
        type: String,
        default: 'NONE'
    },
    origin: String,
    weight: {
        type: Number,
        default: 1
    },
    comments: [{
        type: String
    }],
    star: Number




},
    { timestamps: true }
)

const Products = mongoose.model('Products', schema2);



module.exports = { Users, Products }