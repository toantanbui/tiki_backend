require("dotenv").config();
import jwt from "jsonwebtoken"

const createJWT = (payload) => {

    let key = process.env.JWT_SECRET;
    let options = { expiresIn: '1h' };
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch (err) {
        console.log(err)
    }

    console.log('Gia trị token: ', token)
    return token;
}


module.exports = {
    createJWT: createJWT,

}