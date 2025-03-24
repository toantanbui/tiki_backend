import express from "express"
import adminController from '../controllers/adminController'
import { checkUserJWT } from '../middleware/JWTAction'

let router = express.Router();


router.get('/get-all-users', checkUserJWT, adminController.handleGetAllUsers);
router.post('/delete-users', checkUserJWT, adminController.handleDeleteUsers);

router.post('/create-products', checkUserJWT, adminController.handleCreateProducts);
router.put('/update-products', checkUserJWT, adminController.handleUpdateProducts);
router.post('/delete-products', checkUserJWT, adminController.handleDeleteProducts);
router.get('/get-all-products', adminController.handleGetAllProducts);
router.post('/get-products-category', adminController.handleGetProductsCategory);
router.post('/get-products-id', adminController.handleGetProductsId);


router.get('/get-products-category-1', adminController.handleGetProductsCategory1);
router.get('/get-products-category-2', adminController.handleGetProductsCategory2);
router.get('/get-products-category-3', adminController.handleGetProductsCategory3);

router.get('/get-all-orders-status', checkUserJWT, adminController.handleGetAllOrdersStatus);
router.put('/update-orders', checkUserJWT, adminController.handleUpdateOrders);


module.exports = router;