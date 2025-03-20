import models from '../models/models'
const _ = require('lodash');
import { createJWT } from "../middleware/JWTAction"
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);




let handleCreateUsers = async (data) => {
    if (!data.email || !data.password | !data.firstName || !data.lastName) {
        return {
            errCode: 1,
            errMessage: "Thiếu thông tin đăng kí",
        }
    } else {
        try {
            let hashPasswordFromBcrypt = await bcrypt.hashSync(data.password, salt);
            console.log('hashPassword ', hashPasswordFromBcrypt)

            let result = await models.Users.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age,
                avatar: data.avatar,
                gender: data.gender,

            })

            console.log('result la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {
                return {
                    errCode: 0,
                    errMessage: "Tạo tài khoản thành công"
                }
            } else {
                return {
                    errCode: -1,
                    errMessage: "Lỗi server"
                }
            }


        } catch (e) {
            return {
                errCode: -1,
                errMessage: "Lỗi server"
            }

        }


    }


}


let handleLoginUsers = async (data) => {
    if (!data.email || !data.password) {
        return {
            errCode: 1,
            errMessage: "Thiếu tài khoản hoặc mật khẩu",
            data: []
        }
    } else {
        try {
            let result = await models.Users.find({
                email: data.email,

            })



            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {

                //check là true hoặc false
                let check = await bcrypt.compareSync(data.password, result[0].password);

                console.log('check la ', check)

                if (check) {

                    let token1 = await createJWT({
                        email: data.email,
                        password: result[0].password
                    })


                    return {
                        errCode: 0,
                        errMessage: "Đăng nhập thành công",
                        id: result[0]._id,
                        role: result[0].role,
                        token: token1,
                        data: []
                    }
                } else {
                    return {
                        errCode: 2,
                        errMessage: "Sai tài khoản hoặc mật khẩu",
                        data: []
                    }

                }

            } else {
                return {
                    errCode: 2,
                    errMessage: "Sai tài khoản hoặc mật khẩu",
                    data: []
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

let handleUpdateUsers = async (data) => {
    if (!data.idUsers) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            // let hashPasswordFromBcrypt = await bcrypt.hashSync(data.password, salt);

            let result = await models.Users.updateOne(
                {
                    _id: data.idUsers
                }, {
                // email: data.email,
                // password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age,
                avatar: data.avatar,
                gender: data.gender,
                address: data.address,
                phoneNumber: data.phoneNumber
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

let handleGetUsers = async (data) => {
    if (!data.idUsers) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Users.find({
                _id: data.idUsers,

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




let handleCreateOrders = async (data) => {
    if (!data.idProducts || !data.idUsers) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {

            let result = await models.Orders.create({
                status: data.status,
                idProducts: data.idProducts,
                productName: data.productName,
                price: data.price,
                avatar: data.avatar,
                quantily: data.quantily,
                totalPrice: data.totalPrice,
                shippingCost: data.shippingCost,

                idUsers: data.idUsers,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                email: data.email,
                supplier: data.supplier


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
                    errMessage: "User creation failed"
                }
            }


        } catch (e) {
            return {
                errCode: 2,
                errMessage: "User creation failed"
            }

        }


    }


}



let handleGetOrdersIdUsers = async (data) => {
    if (!data.idUsers) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Orders.find({
                idUsers: data.idUsers,

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

let handleSearchProducts = async (data) => {
    if (!data.text) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Products.find({
                $text: { $search: data.text }

            })

            console.log('result login la ', result,)
            return {
                errCode: 0,
                errMessage: "Get Success",
                data: result,

            }



        } catch (e) {
            return {
                errCode: 2,
                errMessage: "User Get failed"
            }

        }


    }


}


let handleCreateComment = async (data) => {
    if (!data.idProducts || !data.idUsers || !data.commentContent) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {

            let result = await models.Comment.create({


                idUsers: data.idUsers,
                firstName: data.firstName,
                lastName: data.lastName,
                avatar: data.avatar,
                commentContent: data.commentContent,
                commentImage: data.commentImage,


            })

            console.log('result la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {
                let result1 = await models.Products.updateOne(
                    {
                        _id: data.idProducts
                    }, {

                    $push: { comments: result._id },

                })


                return {
                    errCode: 0,
                    errMessage: "Create Success"
                }


            } else {
                return {
                    errCode: 2,
                    errMessage: "User creation failed"
                }
            }


        } catch (e) {
            return {
                errCode: -1,
                errMessage: "Lỗi Server"
            }

        }


    }


}




module.exports = {
    handleCreateUsers: handleCreateUsers,
    handleLoginUsers: handleLoginUsers,
    handleUpdateUsers: handleUpdateUsers,
    handleGetUsers: handleGetUsers,
    handleCreateOrders: handleCreateOrders,
    handleGetOrdersIdUsers: handleGetOrdersIdUsers,
    handleSearchProducts: handleSearchProducts,

    handleCreateComment: handleCreateComment

}