import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol: {
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario',
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;