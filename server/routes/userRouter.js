import {Router} from 'express';
import { getAll,createUser} from '../controllers/userController.js';

const router = Router();

router.get('/', getAll);
router.post('/create', createUser);


export default router;