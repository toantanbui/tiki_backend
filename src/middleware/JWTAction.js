require("dotenv").config();
import jwt from "jsonwebtoken"

const createJWT_access_token = (payload) => {

    let key = process.env.JWT_SECRET;

    let options = { expiresIn: 60 * 10 };

    let token = null;
    try {
        token = jwt.sign(payload, key, options);
    } catch (err) {
        console.log(err)
    }

    console.log('Gia trị token: ', token)
    return token;
}

const createJWT_refresh_token = (payload) => {

    let key = process.env.JWT_SECRET;

    let options = { expiresIn: 60 * 60 };

    let token = null;
    try {
        token = jwt.sign(payload, key, options);
    } catch (err) {
        console.log(err)
    }

    console.log('Gia trị token: ', token)
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);

    } catch (err) {
        console.log(err);
    }
    return decoded;
}



const checkUserJWT = async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];

        console.log('gia tri token', token)
        let decoded = verifyToken(token);
        console.log('decoded', decoded)
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                errCode: 3,
                errMessage: "Not authenticated the user",
            })
        }

    } else {
        return res.status(401).json({
            errCode: 3,
            errMessage: "Not authenticated the user",


        })
    }

}










module.exports = {
    createJWT_refresh_token: createJWT_refresh_token,
    createJWT_access_token: createJWT_access_token,

    checkUserJWT: checkUserJWT

}
