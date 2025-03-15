import adminServices from '../services/adminServices'
import { checkAdmin } from '../utils/check'


let handleGetAllUsers = async (req, res) => {
    try {

        let check = await checkAdmin(req.user);
        if (check) {
            return res.status(401).json({
                errCode: 10,
                errMessage: "Bạn không phải admin"
            })
        }



        console.log('req.user ', req.body, req.user)
        let data = await adminServices.handleGetAllUsers()
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleDeleteUsers = async (req, res) => {
    try {
        let check = await checkAdmin(req.user);
        if (check) {
            return res.status(401).json({
                errCode: 10,
                errMessage: "Bạn không phải admin"
            })
        }
        console.log('req.body ', req.body)
        let data = await adminServices.handleDeleteUsers(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleCreateProducts = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await adminServices.handleCreateProducts(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleUpdateProducts = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await adminServices.handleUpdateProducts(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleDeleteProducts = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await adminServices.handleDeleteProducts(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}
let handleGetAllProducts = async (req, res) => {
    try {
        let check = await checkAdmin(req.user);
        if (check) {
            return res.status(401).json({
                errCode: 10,
                errMessage: "Bạn không phải admin"
            })
        }
        console.log('req.body ', req.body)
        let data = await adminServices.handleGetAllProducts()
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleGetProductsCategory = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await adminServices.handleGetProductsCategory(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleGetProductsId = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await adminServices.handleGetProductsId(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}


let handleGetProductsCategory1 = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await adminServices.handleGetProductsCategory1()
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleGetProductsCategory2 = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await adminServices.handleGetProductsCategory2()
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}

let handleGetProductsCategory3 = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await adminServices.handleGetProductsCategory3()
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}


let handleGetAllOrdersStatus = async (req, res) => {
    try {
        let check = await checkAdmin(req.user);
        if (check) {
            return res.status(401).json({
                errCode: 10,
                errMessage: "Bạn không phải admin"
            })
        }
        // console.log('req.body ', req.body)
        let data = await adminServices.handleGetAllOrdersStatus()
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
    }

}



let handleUpdateOrders = async (req, res) => {
    try {
        console.log('req.body ', req.body)
        let data = await adminServices.handleUpdateOrders(req.body)
        return res.status(200).json(data)

    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "server error"
        })
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