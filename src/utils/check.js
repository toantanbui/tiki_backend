
import models from '../models/models'
const _ = require('lodash');


const checkEmail = async (data) => {

    let result = await models.Users.find({
        email: data.email
    })

    console.log('result login checkEmail là  ', result, !_.isEmpty(result))
    if (!_.isEmpty(result)) {

        return true;
    }


    return false;
}


const checkAdmin = async (data) => {

    let result = await models.Users.find({
        email: data.email,
        password: data.password
    })

    console.log('result login checkAdmin là  ', result)
    if (_.isEmpty(result)) {
        return true;
    } else {
        if (result[0].role !== 'ADMIN') {
            return true;
        }
    }




    return false;
}




const checkPassword = async (data) => {

    let result = await models.Users.find({
        email: data.email,
        password: data.password
    })

    console.log('result login checkEmail là  ', result, !_.isEmpty(result))
    if (!_.isEmpty(result)) {

        return false;
    }


    return true;
}







module.exports = {
    checkEmail, checkAdmin, checkPassword
}