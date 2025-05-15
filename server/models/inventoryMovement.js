import mongoose from "mongoose";

export const InventoryMovementSchema = new mongoose.Schema({
    documentoTransaccion: { type: String, required: true, unique: true },
    fecha: { type: Date, required: true },
    tipoMovimiento: { type: String, enum: ['entrada', 'salida'], required: true },
    productos: [{ 
        producto: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        codigo: { type: String, required: true },
        cantidad: { type: Number, required: true },
     }],
    descripcion: { type: String, required: true },
    usuario: { type: String, required: true }

});

const InventoryMovement = mongoose.model('InventoryMovement', InventoryMovementSchema);
export default InventoryMovement;