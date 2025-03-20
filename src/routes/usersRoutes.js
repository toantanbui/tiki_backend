import express from "express"
import usersController from '../controllers/usersController'
import { checkUserJWT } from '../middleware/JWTAction'

let router = express.Router();


router.post('/create-users', usersController.handleCreateUsers);
router.post('/login-users', usersController.handleLoginUsers);
router.put('/update-users', usersController.handleUpdateUsers);
router.post('/get-users', checkUserJWT, usersController.handleGetUsers);

router.post('/create-orders', usersController.handleCreateOrders);
router.post('/get-orders-idUsers', checkUserJWT, usersController.handleGetOrdersIdUsers);
router.post('/search-products', usersController.handleSearchProducts);

router.post('/create-comment', usersController.handleCreateComment);


module.exports = router;