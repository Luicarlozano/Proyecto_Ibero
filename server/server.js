import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes.js'
import inventoryMovementRoutes from './routes/inventoryMovement.routes.js'
import userRoutes from './routes/user.routes.js'

dotenv.config();

//Instancia de express
const app = express();

//Conecxion a la base de datos
connectDB();

//Middlewares
app.use(express.json());

//Rutas
app.use('/api/products', productRoutes);
app.use('/api/inventoryMovements', inventoryMovementRoutes);
app.use('/api/users', userRoutes);

//Servidor
app.listen(3000, () => {
  console.log(' Servidor corriendo en el puerto 3000');
});
