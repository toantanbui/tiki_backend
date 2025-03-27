import models from '../models/models'
const _ = require('lodash');
import { createJWT } from "../middleware/JWTAction"
import { uploadFile } from '../utils/upload_image'


let handleGetAllUsers = async () => {
    if (false) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Users.find({
            })

            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {



                return {
                    errCode: 0,
                    errMessage: "Get Success",
                    data: result,

                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "User Get failed"
                }
            }


        } catch (e) {
            return {
                errCode: 2,
                errMessage: "User Get failed"
            }

        }


    }


}

let handleDeleteUsers = async (data) => {
    if (!data.idUsers) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Users.deleteOne(
                {
                    _id: data.idUsers
                }

            )

            console.log('result login la ', result, !_.isEmpty(result))


            return {
                errCode: 0,
                errMessage: "Delete Success",
                data: result,

            }

        } catch (e) {
            return {
                errCode: 2,
                errMessage: "User Delete failed"
            }

        }


    }


}


let handleCreateProducts = async (data) => {
    if (!data.category || !data.productName || !data.price || !data.supplier || !data.origin) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let avatar = ''
            if (data.avatar) {
                avatar = await uploadFile(data.avatar)
            }

            let result = await models.Products.create({

                category: data.category,
                productName: data.productName,
                price: data.price,
                avatar: avatar,
                supplier: data.supplier,
                origin: data.origin,
                weight: data.weight,
                star: data.star,
                description: data.description


            })

            console.log('result la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {
                return {
                    errCode: 0,
                    errMessage: "Create Success"
                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "creation failed"
                }
            }


        } catch (e) {
            return {
                errCode: 2,
                errMessage: "creation failed"
            }

        }


    }


}

let handleUpdateProducts = async (data) => {
    if (!data.idProducts) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {


            let avatar = ''
            if (data.avatar && data.avatar.length > 200) {
                avatar = await uploadFile(data.avatar)
            }

            if (data.avatar && data.avatar.length < 200) {
                avatar = data.avatar
            }

            let result = await models.Products.updateOne(
                {
                    _id: data.idProducts
                }, {
                // email: data.email,
                category: data.category,
                productName: data.productName,
                price: data.price,
                avatar: avatar,
                supplier: data.supplier,
                origin: data.origin,
                weight: data.weight,
                star: data.star,
            })

            console.log('result la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {
                return {
                    errCode: 0,
                    errMessage: "Update Success"
                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "User update failed"
                }
            }


        } catch (e) {
            return {
                errCode: 2,
                errMessage: "User update failed"
            }

        }


    }


}

let handleDeleteProducts = async (data) => {
    if (!data.idProducts) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Products.deleteOne(
                {
                    _id: data.idProducts
                }

            )

            console.log('result login la ', result, !_.isEmpty(result))


            return {
                errCode: 0,
                errMessage: "Delete Success",
                data: result,

            }

        } catch (e) {
            return {
                errCode: 2,
                errMessage: "User Delete failed"
            }

        }


    }


}

let handleGetAllProducts = async (data) => {
    if (false) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let number_limit = 5
            let number_skip = 0
            // if (data.number_limit !== undefined) {
            //     number_limit = data.number_limit
            // }

            if (data.number_skip !== undefined) {
                number_skip = data.number_skip
            }
            console.log('limit, skip', number_limit, number_skip)

            let result = await models.Products.find({
            }).sort({ createdAt: -1 })
                .skip(number_skip)
                .limit(number_limit)

            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {
                let lenght_data = await models.Products.countDocuments();



                return {
                    errCode: 0,
                    errMessage: "Get Success",
                    data: result,
                    lenght_data: lenght_data

                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "User Get failed"
                }
            }


        } catch (e) {
            return {
                errCode: 2,
                errMessage: "User Get failed"
            }

        }


    }


}

let handleGetProductsCategory = async (data) => {
    if (!data.category) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let number_limit = 2
            let number_skip = 0

            if (data.number_skip !== undefined) {
                number_skip = data.number_skip
            }
            let result = await models.Products.find({
                category: data.category
            })
                .sort({ createdAt: -1 })
                .skip(number_skip)
                .limit(number_limit)


            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {

                let lenght_data = await models.Products.countDocuments({
                    category: data.category
                });

                return {
                    errCode: 0,
                    errMessage: "Get Success",
                    data: result,
                    lenght_data: lenght_data


                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "User Get failed"
                }
            }


        } catch (e) {

            return {
                errCode: 2,
                errMessage: "User Get failed"
            }

        }


    }


}

let handleGetProductsId = async (data) => {
    if (!data.idProducts) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            // let result = await models.Products.find({
            //     _id: data.idProducts
            // })
            //     .populate({
            //         path: 'comments',
            //         populate: {
            //             path: 'comment1.likeStatus',
            //             options: { limit: 1 }

            //         },

            //     })
            //     .populate({
            //         path: 'comments',
            //         populate: {
            //             path: 'likeStatus',


            //         },
            //         options: { sort: { createdAt: -1 }, limit: 7 } // Sắp xếp theo trường createdAt giảm dần
            //     })
            let number = 5;
            if (data.number !== undefined) {
                number = data.number
            }


            let result = await models.Products.find({
                _id: data.idProducts
            })
                .populate({
                    path: 'comments',
                    populate: [
                        {
                            path: 'comment1.likeStatus',
                            // options: { sort: { createdAt: -1 }, limit: 7 }
                        },
                        {
                            path: 'likeStatus',

                        }
                    ],
                    options: { sort: { createdAt: -1 }, limit: number }
                });





            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {

                let lenght_data = await models.Comment.countDocuments({
                    idProducts: data.idProducts
                });


                return {
                    errCode: 0,
                    errMessage: "Get Success",
                    data: result,
                    lenght_data: lenght_data

                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "User Get failed"
                }
            }


        } catch (e) {

            return {
                errCode: 2,
                errMessage: "User Get failed"
            }

        }


    }


}


let handleGetProductsCategory1 = async () => {
    if (false) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Products.find({
                category: 1
            })
                .limit(10)

            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {



                return {
                    errCode: 0,
                    errMessage: "Get Success",
                    data: result,

                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "User Get failed"
                }
            }


        } catch (e) {

            return {
                errCode: 2,
                errMessage: "User Get failed"
            }

        }


    }


}

let handleGetProductsCategory2 = async () => {
    if (false) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Products.find({
                category: 2
            })
                .limit(10)

            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {



                return {
                    errCode: 0,
                    errMessage: "Get Success",
                    data: result,

                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "User Get failed"
                }
            }


        } catch (e) {

            return {
                errCode: 2,
                errMessage: "User Get failed"
            }

        }


    }


}

let handleGetProductsCategory3 = async () => {
    if (false) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Products.find({
                category: 3
            })
                .limit(10)

            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {



                return {
                    errCode: 0,
                    errMessage: "Get Success",
                    data: result,

                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "User Get failed"
                }
            }


        } catch (e) {

            return {
                errCode: 2,
                errMessage: "User Get failed"
            }

        }


    }


}

let handleGetAllOrdersStatus = async () => {
    if (false) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Orders.find({
                status: { $in: [1, 2] }
            })
                .sort({ createdAt: -1 })

            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {



                return {
                    errCode: 0,
                    errMessage: "Get Success",
                    data: result,

                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "User Get failed"
                }
            }


        } catch (e) {
            return {
                errCode: 2,
                errMessage: "User Get failed"
            }

        }


    }


}


let handleUpdateOrders = async (data) => {
    if (!data.idOrders) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {

            let result = await models.Orders.updateOne(
                {
                    _id: data.idOrders
                }, {

                status: data.status,


            })

            console.log('result la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {
                return {
                    errCode: 0,
                    errMessage: "Update Success"
                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "User update failed"
                }
            }


        } catch (e) {
            return {
                errCode: 2,
                errMessage: "User update failed"
            }

        }


    }


}







module.exports = {
    handleGetAllUsers: handleGetAllUsers,
    handleDeleteUsers: handleDeleteUsers,
    handleCreateProducts: handleCreateProducts,
    handleUpdateProducts: handleUpdateProducts,
    handleDeleteProducts: handleDeleteProducts,
    handleGetAllProducts: handleGetAllProducts,
    handleGetProductsCategory: handleGetProductsCategory,
    handleGetProductsId: handleGetProductsId,
    handleGetProductsCategory1: handleGetProductsCategory1,
    handleGetProductsCategory2: handleGetProductsCategory2,
    handleGetProductsCategory3: handleGetProductsCategory3,
    handleGetAllOrdersStatus: handleGetAllOrdersStatus,
    handleUpdateOrders: handleUpdateOrders

}