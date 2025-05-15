import express from 'express';
import {
    getInventoryMovements,
    getInventoryMovementById,
    createInventoryMovement,
    updateInventoryMovement,
    deleteInventoryMovement,
    getInventoryMovementsByType
} from '../controllers/inventoryMovementController.js';

const router = express.Router();

router.get('/', getInventoryMovements);
router.get('/:documentoTransaccion', getInventoryMovementById);
router.get('/tipo/:tipoMovimiento', getInventoryMovementsByType);
router.post('/', createInventoryMovement);
router.put('/:documentoTransaccion', updateInventoryMovement);
router.delete('/:documentoTransaccion', deleteInventoryMovement);

export default router;