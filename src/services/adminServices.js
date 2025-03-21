import models from '../models/models'
const _ = require('lodash');
import { createJWT } from "../middleware/JWTAction"



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

            let result = await models.Products.create({

                category: data.category,
                productName: data.productName,
                price: data.price,
                avatar: data.avatar,
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

            let result = await models.Products.updateOne(
                {
                    _id: data.idProducts
                }, {
                // email: data.email,
                category: data.category,
                productName: data.productName,
                price: data.price,
                avatar: data.avatar,
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

let handleGetAllProducts = async () => {
    if (false) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Products.find({
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

let handleGetProductsCategory = async (data) => {
    if (!data.category) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Products.find({
                category: data.category
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

let handleGetProductsId = async (data) => {
    if (!data.idProducts) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Products.find({
                _id: data.idProducts
            })
                .populate({
                    path: 'comments',
                    options: { sort: { createdAt: -1 } } // Sắp xếp theo trường createdAt giảm dần
                });

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