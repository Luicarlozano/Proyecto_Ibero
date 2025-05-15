import express from 'express';
import {
    getUsers,
    getUserById,
    getUserByIdEmail,
    createUser,
    updateUser,
    deleteUser,
    login
} from '../controllers/userController.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Ruta Login
router.post('/login', login);

// Rutas de usuarios
router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserById);
router.get('/email/:email', verifyToken, getUserByIdEmail);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
