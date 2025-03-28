
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

        _id: data.idUsers
    })

    console.log('result login checkAdmin là  ', result)
    if (!_.isEmpty(result) && result[0].role === 'ADMIN') {
        return true;
    }




    return false;
}











module.exports = {
    checkEmail, checkAdmin
}