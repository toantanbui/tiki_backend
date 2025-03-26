import models from '../models/models'
const _ = require('lodash');
import { createJWT_refresh_token, createJWT_access_token } from "../middleware/JWTAction"
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

import { uploadFile } from '../utils/upload_image'




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

                    let access_token = await createJWT_access_token({
                        idUsers: result[0]._id,
                        email: data.email,

                    })

                    let refresh_token = await createJWT_refresh_token({
                        idUsers: result[0]._id,
                        email: data.email,

                    })


                    await models.Users.updateOne(
                        {
                            _id: result[0]._id
                        }, {

                        token: refresh_token,

                    })

                    return {
                        errCode: 0,
                        errMessage: "Đăng nhập thành công",
                        id: result[0]._id,
                        role: result[0].role,
                        access_token: access_token,
                        refresh_token: refresh_token,
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
            let avatar = ''
            if (data.avatar) {
                avatar = await uploadFile(data.avatar)
            }


            let result = await models.Users.updateOne(
                {
                    _id: data.idUsers
                }, {
                // email: data.email,
                // password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age,
                avatar: avatar,
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

            }, { password: 0, token: 0 })


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
            // let avatar = ''
            // if (data.avatar) {
            //     avatar = await uploadFile(data.avatar)
            // }

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
                    errMessage: "creation failed"
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
            let number_limit = 5
            let number_skip = 0

            if (data.number_skip !== undefined) {
                number_skip = data.number_skip
            }
            let result = await models.Products.find({
                $text: { $search: data.text }

            })
                .sort({ createdAt: -1 })
                .skip(number_skip)
                .limit(number_limit)
            let lenght_data = await models.Products.countDocuments({
                $text: { $search: data.text }
            });

            console.log('result login la ', result,)
            return {
                errCode: 0,
                errMessage: "Get Success",
                data: result,
                lenght_data: lenght_data

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


            let commentImage = ''
            if (data.commentImage) {
                commentImage = await uploadFile(data.commentImage)
            }

            let result = await models.Comment.create({

                idProducts: data.idProducts,
                idUsers: data.idUsers,
                firstName: data.firstName,
                lastName: data.lastName,
                avatar: data.avatar,
                commentContent: data.commentContent,
                commentImage: commentImage,


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


let handleDeleteComment = async (data) => {
    if (!data.idComment || !data.idUsers) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {


            let result = await models.Comment.find({
                _id: data.idComment,
                idUsers: data.idUsers,

            })
            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {

                let result1 = await models.Comment.deleteOne(
                    {
                        _id: data.idComment,
                    }

                )

                return {
                    errCode: 0,
                    errMessage: "Delete Success",
                    // data: result,

                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "Delete failed"
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


let handleCreateComment1 = async (data) => {
    if (!data.idComment || !data.idUsers || !data.commentContent) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {


            let commentImage = ''
            if (data.commentImage) {
                commentImage = await uploadFile(data.commentImage)
            }


            let result = await models.Comment.updateOne(
                {
                    _id: data.idComment
                }, {
                $push: {
                    comment1: {

                        idUsers: data.idUsers,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        avatar: data.avatar,

                        commentContent: data.commentContent,
                        commentImage: commentImage,
                    }

                }
            })
            return {
                errCode: 0,
                errMessage: "Create Success"
            }






        } catch (e) {
            return {
                errCode: -1,
                errMessage: "Lỗi Server"
            }

        }


    }


}

let handleDeleteComment1 = async (data) => {
    if (!data.idComment || !data.idUsers || !data.idComment1) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {


            let result = await models.Comment.updateOne(
                {
                    _id: data.idComment
                }, {
                $pull: {
                    comment1: {
                        _id: data.idComment1,
                        idUsers: data.idUsers
                    }
                }
            })
            console.log('update la ', result)
            return {
                errCode: 0,
                errMessage: "Create Success"
            }






        } catch (e) {
            return {
                errCode: -1,
                errMessage: "Lỗi Server"
            }

        }


    }


}


let handleCreateLikeComment = async (data) => {
    if (!data.idComment || !data.idUsers) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {

            let result = await models.likeStatus.find({
                idUsers: data.idUsers,
                idComment: data.idComment

            })

            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {
                if (data.status === 'true') {

                    await models.likeStatus.updateOne(
                        {
                            idUsers: data.idUsers,
                            idComment: data.idComment
                        }, {

                        status: true

                    })

                    await models.Comment.updateOne(
                        {
                            _id: data.idComment
                        }, {

                        $inc: { likes: 1 }

                    })


                    return {
                        errCode: 0,
                        errMessage: "Tăng like"
                    }




                } else {


                    await models.likeStatus.updateOne(
                        {
                            idUsers: data.idUsers,
                            idComment: data.idComment
                        }, {

                        status: false

                    })

                    await models.Comment.updateOne(
                        {
                            _id: data.idComment
                        }, {

                        $inc: { likes: -1 }

                    })


                    return {
                        errCode: 0,
                        errMessage: "Giam like"
                    }


                }




            } else {
                let result1 = await models.likeStatus.create({
                    idComment: data.idComment,
                    idUsers: data.idUsers,
                    status: true,

                })
                if (!_.isEmpty(result1)) {

                    await models.Comment.updateOne(
                        {
                            _id: data.idComment
                        }, {

                        $push: { likeStatus: result1._id },
                        $inc: { likes: 1 }
                    })

                    return {
                        errCode: 0,
                        errMessage: "Lần đầu tạo like"
                    }

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


let handleCreateLikeComment1 = async (data) => {
    if (!data.idComment || !data.idComment1 || !data.idUsers) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {

            let result = await models.likeStatus1.find({
                idUsers: data.idUsers,
                idComment1: data.idComment1

            })

            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {
                if (data.status === 'true') {

                    await models.likeStatus1.updateOne(
                        {
                            idUsers: data.idUsers,
                            idComment1: data.idComment1
                        }, {

                        status: true

                    })

                    await models.Comment.updateOne(
                        {
                            _id: data.idComment,
                            "comment1._id": data.idComment1

                        }, {

                        $inc: { "comment1.$.likes": 1 }

                    },

                    )


                    return {
                        errCode: 0,
                        errMessage: "Tăng like"
                    }




                } else {


                    await models.likeStatus1.updateOne(
                        {
                            idUsers: data.idUsers,
                            idComment1: data.idComment1
                        }, {

                        status: false

                    })

                    await models.Comment.updateOne(
                        {
                            _id: data.idComment,
                            "comment1._id": data.idComment1

                        }, {

                        $inc: { "comment1.$.likes": -1 }

                    },

                    )


                    return {
                        errCode: 0,
                        errMessage: "Giam like"
                    }


                }




            } else {
                let result1 = await models.likeStatus1.create({
                    idComment1: data.idComment1,
                    idUsers: data.idUsers,
                    status: true,

                })
                if (!_.isEmpty(result1)) {


                    await models.Comment.updateOne(
                        {
                            _id: data.idComment,
                            "comment1._id": data.idComment1

                        }, {
                        $push: {
                            "comment1.$.likeStatus": result1._id,

                        },
                        $inc: { "comment1.$.likes": 1 }

                    },

                    )

                    return {
                        errCode: 0,
                        errMessage: "Lần đầu tạo like"
                    }

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




let handleRefreshToken = async (data) => {
    if (!data.idUsers || !data.refresh_token) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Users.find({
                _id: data.idUsers,

            })
            console.log('refresh_token', data.refresh_token)
            console.log('refresh_token 111', result[0].token)
            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {
                if (result[0].token === data.refresh_token) {

                    let access_token = await createJWT_access_token({
                        idUsers: result[0]._id,
                        email: data.email,

                    })

                    return {
                        errCode: 0,
                        errMessage: "Cập nhật access_token thành công ",
                        data: access_token

                    }




                } else {
                    return {
                        errCode: 2,
                        errMessage: "refresh_token sai",



                    }

                }



            } else {
                return {
                    errCode: 2,
                    errMessage: "refresh_token sai",


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


let handleLoginOut = async (data) => {
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

                token: "none"

            })

            return {
                errCode: 0,
                errMessage: "Update Success"
            }




        } catch (e) {
            return {
                errCode: -1,
                errMessage: "Lỗi server"
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

    handleCreateComment: handleCreateComment,
    handleDeleteComment: handleDeleteComment,

    handleCreateComment1: handleCreateComment1,
    handleDeleteComment1: handleDeleteComment1,

    handleCreateLikeComment: handleCreateLikeComment,
    handleCreateLikeComment1: handleCreateLikeComment1,

    handleRefreshToken: handleRefreshToken,
    handleLoginOut: handleLoginOut

}