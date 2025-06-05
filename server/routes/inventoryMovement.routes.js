import express from 'express';
import {
    getInventoryMovements,
    getInventoryMovementById,
    createInventoryMovement,
    updateInventoryMovement,
    deleteInventoryMovement,
    getInventoryMovementsByType
} from '../controllers/inventoryMovementController.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

router.get('/', getInventoryMovements);
router.get('/:documentoTransaccion', getInventoryMovementById);
router.get('/tipo/:tipoMovimiento', getInventoryMovementsByType);
router.post('/',verifyToken ,createInventoryMovement);
router.put('/:documentoTransaccion', verifyToken,updateInventoryMovement);
router.delete('/:documentoTransaccion', verifyToken,deleteInventoryMovement);

export default router;