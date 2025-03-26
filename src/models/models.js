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
    avatar: String,


    token: String,
    time: {
        type: Date,
        default: Date.now
    },


}, { collection: 'tiki_users' },
    { timestamps: true }
)

const Users = mongoose.model('Users', schema1);


const schema2 = new Schema({
    category: {
        type: Number,

    },
    productName: String,
    price: String,
    avatar: String,
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
        type: String,
        ref: 'Comment'
    }],
    star: Number




},
    { timestamps: true }
)

const Products = mongoose.model('Products', schema2);
const abc = schema2.path('productName').index({ text: true });
console.log('gia trị abc', abc)

Products.createIndexes();

const schemaCm = new Schema({

    idProducts: String,

    idUsers: String,
    firstName: String,
    lastName: String,
    avatar: String,

    time: {
        type: Date,
        default: Date.now
    },


    commentContent: String,
    commentImage: String,
    likes: {
        type: Number,
        default: 0
    },
    likeStatus: [{
        type: String,
        ref: 'likeStatus'
    }],
    comment1: [
        {
            idUsers: String,
            firstName: String,
            lastName: String,
            avatar: String,
            time: {
                type: Date,
                default: Date.now
            },
            likes: {
                type: Number,
                default: 0
            },

            commentContent: String,
            commentImage: String,
            likeStatus: [{
                type: String,
                ref: 'likeStatus1'
            }],
        }
    ]



},
    { timestamps: true }
)



const Comment = mongoose.model('Comment', schemaCm);

const schemalikeStatus = new Schema({
    idComment: String,
    idUsers: String,
    status: Boolean


},
    { timestamps: true }
)

const likeStatus = mongoose.model('likeStatus', schemalikeStatus);

const schemalikeStatus1 = new Schema({
    idComment1: String,
    idUsers: String,
    status: Boolean


},
    { timestamps: true }
)

const likeStatus1 = mongoose.model('likeStatus1', schemalikeStatus1);




const schema3 = new Schema({
    status: {
        type: Number,
        default: 1

    },
    idProducts: String,
    productName: String,
    price: String,
    avatar: String,
    quantily: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: String,

    },
    shippingCost: String,
    idUsers: {
        type: String,

    },

    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    email: String,
    supplier: {
        type: String,
        default: 'NONE'
    },




},
    { timestamps: true }
)

const Orders = mongoose.model('Orders', schema3);


module.exports = { Users, Products, Orders, Comment, likeStatus, likeStatus1 }