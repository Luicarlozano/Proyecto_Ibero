import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


//Consultar usuarios
export const getUsers = async (req, res) => {
    try {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ mensaje: 'Acceso denegado. Solo el administrador puede consultar usuarios.' });
        }

        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al consultar los usuarios', error });        
    }
};

//Consultar un usuario por id
export const getUserById = async (req, res) => {
    try {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ mensaje: 'Acceso denegado. Solo el administrador puede consultar usuarios.' });
        }
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al consultar el usuario', error });
    }
};

//Consultar un usuario por email
export const getUserByIdEmail = async (req, res) => {
    try {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ mensaje: 'Acceso denegado. Solo el administrador puede consultar usuarios.' });
        }
        const {  email } = req.params;
        const user = await User.findOne({ email });
        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al consultar el usuario', error });
    }
};

//Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ mensaje: 'Acceso denegado. Solo el administrador puede crear usuarios.' });
        }

        const { nombre, email, contraseña, rol } = req.body;

        // Validación básica
        if (!nombre || !email || !contraseña || !rol) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
        }

        // Verificar si ya existe el usuario
        const existe = await User.findOne({ email });
        if (existe) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const contraseñaHash = await bcrypt.hash(contraseña, salt);

        // Crear usuario
        const nuevoUsuario = new User({ nombre, email, contraseña: contraseñaHash, rol });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario creado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el usuario', error });
    }
};

//Actualizar usuario por id
export const updateUser = async (req, res) => {
    if (req.user.rol !== 'admin') {
        return res.status(403).json({ mensaje: 'Acceso denegado. Solo el administrador puede actualizar usuarios.' });
    }

    try {
        const { id } = req.params;
        const { nombre, email, contraseña, rol } = req.body;

        // Validación básica
        if (!nombre || !email || !contraseña || !rol) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
        }

        // Verificar si ya existe el usuario
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al actualizar el usuario', error });
    }

};

//Eliminar un usuario por id
export const deleteUser = async (req, res) => {
    try {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ mensaje: 'Acceso denegado. Solo el administrador puede eliminar usuarios.' });
        }
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ mensaje: 'Usuario eliminado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
    }
}

export const login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
        }

        // Generar token
        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ mensaje: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error del servidor', error });
    }
};

