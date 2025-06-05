import mongoose from "mongoose";

export const InventoryMovementSchema = new mongoose.Schema({
  codigoTRX: { type: String, required: true, unique: true },
  fecha: { type: Date, required: true },
  tipoMovimiento: {
    type: String,
    enum: ["Venta", "Ingreso Inventario", "Salida Producto Dañado"],
    required: true,
  },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  cantidad: { type: Number, required: true },
  descripcion: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const InventoryMovement = mongoose.model(
  "InventoryMovement",
  InventoryMovementSchema
);
export default InventoryMovement;
