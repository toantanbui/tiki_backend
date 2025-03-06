const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema1 = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    age: Number,
    role: {
        type: String,
        default: 'USERS'
    },
    gender: String,
    avatar: Buffer,

    phoneNumber: String,
    token: String,


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