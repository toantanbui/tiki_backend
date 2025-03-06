import usersService from '../services/usersServices'


let handleCreateUsers = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await usersService.handleCreateUsers(req.body)
        return res.status(200).json(data)

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
        console.log('req.body ', req.body)
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



module.exports = {
    handleCreateUsers: handleCreateUsers,
    handleLoginUsers: handleLoginUsers,
    handleUpdateUsers: handleUpdateUsers,
    handleGetUsers: handleGetUsers,


}