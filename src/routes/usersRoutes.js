import express from "express"
import usersController from '../controllers/usersController'
import { checkUserJWT } from '../middleware/JWTAction'

let router = express.Router();


router.post('/create-users', usersController.handleCreateUsers);
router.post('/login-users', usersController.handleLoginUsers);
router.put('/update-users', checkUserJWT, usersController.handleUpdateUsers);
router.post('/get-users', checkUserJWT, usersController.handleGetUsers);

router.post('/create-orders', usersController.handleCreateOrders);
router.post('/get-orders-idUsers', checkUserJWT, usersController.handleGetOrdersIdUsers);
router.post('/search-products', usersController.handleSearchProducts);

router.post('/create-comment', checkUserJWT, usersController.handleCreateComment);
router.post('/delete-comment', checkUserJWT, usersController.handleDeleteComment);

router.post('/create-comment1', checkUserJWT, usersController.handleCreateComment1);
router.post('/delete-comment1', checkUserJWT, usersController.handleDeleteComment1);


module.exports = router;