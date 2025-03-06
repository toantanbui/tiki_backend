import express from "express"
import adminController from '../controllers/adminController'

let router = express.Router();


router.get('/get-all-users', adminController.handleGetAllUsers);
router.delete('/delete-users', adminController.handleDeleteUsers);

router.post('/create-products', adminController.handleCreateProducts);
router.put('/update-products', adminController.handleUpdateProducts);
router.delete('/delete-products', adminController.handleDeleteProducts);
router.get('/get-all-products', adminController.handleGetAllProducts);
router.post('/get-products-category', adminController.handleGetProductsCategory);
router.post('/get-products-id', adminController.handleGetProductsId);


module.exports = router;