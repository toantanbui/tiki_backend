import express from "express"
import adminController from '../controllers/adminController'

let router = express.Router();


router.get('/get-all-users', adminController.handleGetAllUsers);
router.post('/delete-users', adminController.handleDeleteUsers);

router.post('/create-products', adminController.handleCreateProducts);
router.put('/update-products', adminController.handleUpdateProducts);
router.post('/delete-products', adminController.handleDeleteProducts);
router.get('/get-all-products', adminController.handleGetAllProducts);
router.post('/get-products-category', adminController.handleGetProductsCategory);
router.post('/get-products-id', adminController.handleGetProductsId);


router.get('/get-products-category-1', adminController.handleGetProductsCategory1);
router.get('/get-products-category-2', adminController.handleGetProductsCategory2);
router.get('/get-products-category-3', adminController.handleGetProductsCategory3);

router.get('/get-all-orders-status', adminController.handleGetAllOrdersStatus);
router.put('/update-orders', adminController.handleUpdateOrders);


module.exports = router;