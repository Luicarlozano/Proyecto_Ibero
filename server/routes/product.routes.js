import express from 'express';
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductsByBrand,
    getProductsByCategory,
    getProductByCode,
    updateProduct,
    updateProductField
} from '../controllers/productController.js';
import { uploadSupabase } from '../middleware/uploadSupabase.js';
import { upload } from '../config/multerConfig.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', upload.single("imagen"),uploadSupabase,createProduct);
router.get('/', getProducts);
router.get('/category/:categoria', getProductsByCategory);
router.get('/brand/:marca', getProductsByBrand);
router.get('/:codigo', getProductByCode);
router.put('/:codigo', updateProduct);
router.patch('/:codigo', updateProductField);
router.delete('/:codigo', deleteProduct);

export default router;