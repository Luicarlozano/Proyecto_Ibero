import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Espera formato: "Bearer token"

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ahora tienes el usuario y rol en req.user
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};