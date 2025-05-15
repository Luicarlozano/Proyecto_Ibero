import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    marca: { type: String, required: true },
    color: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    imagen: { type: String, required: true },
    categoria: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
