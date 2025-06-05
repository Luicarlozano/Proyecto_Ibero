import { getUserByEmail } from "../services/userService.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function login(req,res) {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({ok:false,message:'Tanto el email como la contraseña son requeridos'});
        }
        const user = await getUserByEmail(email);
        if(!user || user.deleteAt !== null){
            return res.status(400).json({ok:false,message:'Usuario no existe o a sido eliminado'});
        }
        const passwordValid = await bcrypt.compare(password,user.password);
        if(!passwordValid){
            return res.status(400).json({ok:false,message:'Contraseña incorrecta'});
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET);
        return res.json({token})
    } catch (error) {
        res.status(500).json({ok:false,message:error.message});
    }
    
}