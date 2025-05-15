import {Router} from 'express';
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import inventoryMovementRouter from './inventoryMovementRouter.js';


const router = Router();

router.use('/users',userRouter);
router.use('/products',productRouter);
router.use('/inventoryMovements',inventoryMovementRouter);


export default router;
