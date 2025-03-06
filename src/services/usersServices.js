import models from '../models/models'
const _ = require('lodash');
import { createJWT } from "../middleware/JWTAction"



let handleCreateUsers = async (data) => {
    if (!data.email || !data.password) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {

            let result = await models.Users.create({
                email: data.email,
                password: data.password,
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


let handleLoginUsers = async (data) => {
    if (!data.email || !data.password) {
        return {
            errCode: 1,
            errMessage: "Missing paramater",
        }
    } else {
        try {
            let result = await models.Users.find({
                email: data.email,
                password: data.password
            })

            console.log('result login la ', result, !_.isEmpty(result))
            if (!_.isEmpty(result)) {

                let token1 = await createJWT({
                    email: data.email,
                    password: data.password
                })


                return {
                    errCode: 0,
                    errMessage: "Get Success",
                    id: result[0]._id,
                    role: result[0].role,
                    token: token1
                }
            } else {
                return {
                    errCode: 2,
                    errMessage: "Wrong account or password"
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

            let result = await models.Users.updateOne(
                {
                    _id: data.idUsers
                }, {
                // email: data.email,
                password: data.password,
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




module.exports = {
    handleCreateUsers: handleCreateUsers,
    handleLoginUsers: handleLoginUsers,
    handleUpdateUsers: handleUpdateUsers,
    handleGetUsers: handleGetUsers

}