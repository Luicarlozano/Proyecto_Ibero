import {Router} from 'express';
import { getAll,createUser,updatedUser,deleteUserByEmail,getByState} from '../controllers/userController.js';

const router = Router();

router.get('/', getAll);
router.get('/:state', getByState);
router.post('/create', createUser);
router.put('/update', updatedUser);
router.delete('/delete/', deleteUserByEmail);


export default router;