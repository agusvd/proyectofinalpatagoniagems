import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "😞 Acceder" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "😞 Sesion expirada" });
            } else {
                req.nombre = decoded.nombre;
                req.apellido = decoded.apellido;
                req.role = decoded.role;
                req.id = decoded.id
                next();
            }
        });
    }
};

// Ruta de inicio, requiere autenticación
router.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Perfecto", nombre: req.nombre, apellido: req.apellido, role: req.role, id: req.id });
});

export default router