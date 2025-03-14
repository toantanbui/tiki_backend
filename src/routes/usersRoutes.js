import express from "express"
import usersController from '../controllers/usersController'

let router = express.Router();


router.post('/create-users', usersController.handleCreateUsers);
router.post('/login-users', usersController.handleLoginUsers);
router.put('/update-users', usersController.handleUpdateUsers);
router.post('/get-users', usersController.handleGetUsers);

router.post('/create-orders', usersController.handleCreateOrders);
router.post('/get-orders-idUsers', usersController.handleGetOrdersIdUsers);
router.post('/search-products', usersController.handleSearchProducts);


module.exports = router;