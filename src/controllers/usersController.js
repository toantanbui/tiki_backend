import usersService from '../services/usersServices'
import { checkEmail } from '../utils/check'
import { uploadFile } from '../utils/upload_image'


let handleCreateUsers = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let check = await checkEmail(req.body)
        if (check) {
            return res.status(200).json({
                errCode: -10,
                errMessage: "Email đã tồn tại"
            })
        } else {
            let data = await usersService.handleCreateUsers(req.body)
            return res.status(200).json(data)
        }


    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleLoginUsers = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await usersService.handleLoginUsers(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleUpdateUsers = async (req, res) => {
    try {
        if (req.user.key !== 'access_token') {
            return res.status(402).json({
                errCode: 3,
                errMessage: "Không phải access_token",
            })

        }


        console.log('req.user ', req.user)
        let data = await usersService.handleUpdateUsers(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleGetUsers = async (req, res) => {

    try {
        if (req.user.key !== 'access_token') {
            return res.status(402).json({
                errCode: 3,
                errMessage: "Không phải access_token",
            })

        }
        console.log('req.user ', req.user)
        console.log('req.body ', req.body)
        let data = await usersService.handleGetUsers(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}


let handleCreateOrders = async (req, res) => {
    try {
        if (req.user.key !== 'access_token') {
            return res.status(402).json({
                errCode: 3,
                errMessage: "Không phải access_token",
            })

        }
        console.log('req.body ', req.body)
        let data = await usersService.handleCreateOrders(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}


let handleGetOrdersIdUsers = async (req, res) => {
    try {
        if (req.user.key !== 'access_token') {
            return res.status(402).json({
                errCode: 3,
                errMessage: "Không phải access_token",
            })

        }

        console.log('req.body ', req.body)
        let data = await usersService.handleGetOrdersIdUsers(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleSearchProducts = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await usersService.handleSearchProducts(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}


let handleCreateComment = async (req, res) => {
    try {
        if (req.user.key !== 'access_token') {
            return res.status(402).json({
                errCode: 3,
                errMessage: "Không phải access_token",
            })

        }
        console.log('req.body ', req.body)
        let data = await usersService.handleCreateComment(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleDeleteComment = async (req, res) => {
    try {
        if (req.user.key !== 'access_token') {
            return res.status(402).json({
                errCode: 3,
                errMessage: "Không phải access_token",
            })

        }
        console.log('req.body ', req.body)
        let data = await usersService.handleDeleteComment(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}


let handleCreateComment1 = async (req, res) => {
    try {
        if (req.user.key !== 'access_token') {
            return res.status(402).json({
                errCode: 3,
                errMessage: "Không phải access_token",
            })

        }
        console.log('req.body ', req.body)
        let data = await usersService.handleCreateComment1(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleDeleteComment1 = async (req, res) => {
    try {
        if (req.user.key !== 'access_token') {
            return res.status(402).json({
                errCode: 3,
                errMessage: "Không phải access_token",
            })

        }
        console.log('req.body ', req.body)
        let data = await usersService.handleDeleteComment1(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleCreateLikeComment = async (req, res) => {
    try {
        if (req.user.key !== 'access_token') {
            return res.status(402).json({
                errCode: 3,
                errMessage: "Không phải access_token",
            })

        }
        console.log('req.body ', req.body)
        let data = await usersService.handleCreateLikeComment(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleCreateLikeComment1 = async (req, res) => {
    try {
        if (req.user.key !== 'access_token') {
            return res.status(402).json({
                errCode: 3,
                errMessage: "Không phải access_token",
            })

        }
        console.log('req.body ', req.body)
        let data = await usersService.handleCreateLikeComment1(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleRefreshToken = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await usersService.handleRefreshToken(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}


let handleLoginOut = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await usersService.handleLoginOut(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
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