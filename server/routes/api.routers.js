import {Router} from 'express';
import userRouter from './user.routers.js';
import productRouter from './product.routes.js';
import inventoryMovementRouter from './inventoryMovement.routes.js';
import authRouter from './auth.routes.js';


const router = Router();

router.use('/users',userRouter);
router.use('/products',productRouter);
router.use('/inventoryMovements',inventoryMovementRouter);
router.use('/auth',authRouter);


export default router;
