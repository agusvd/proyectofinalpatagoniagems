import express from 'express'
import db from '../db.js'
import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator'

const router = express.Router()

// Numeros de rondas que usa el hash para generar la encriptacion de la contraseña
const rondas = 10

// Capitalizacion de la primera letra de la cadena
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Validacion de entrada
const validarRegistro = () => {
    return [
        body('nombre').trim().notEmpty().isString(),
        body('apellido').trim().notEmpty().isString(),
        body('email').trim().notEmpty().isEmail(),
        body('contraseña').trim().notEmpty().isLength({ min: 8 }),
    ];
};


// Ruta /register
router.post('/register', validarRegistro(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const { nombre, apellido, email, contraseña } = req.body;

    const correoExistenteQuery = "SELECT * FROM usuarios WHERE email = ?";
    db.query(correoExistenteQuery, [email], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al verificar la existencia del correo" });
        }

        if (results.length > 0) {
            // El correo ya existe
            return res.status(400).json({ error: "El correo electrónico ya está registrado" });
        }

        // El correo no existe, proceder con el registro
        bcrypt.hash(contraseña, rondas, (hashError, hashedPassword) => {
            if (hashError) {
                console.error(hashError);
                return res.status(500).json({ error: "Error al generar el hash de la contraseña" });
            }

            const insertQuery = "INSERT INTO usuarios (`nombre`, `apellido`, `email`, `contraseña`, `role`) VALUES (?, ?, ?, ?, ?)";
            db.query(insertQuery, [capitalize(nombre), capitalize(apellido), email, hashedPassword, 'user'], (insertError) => {
                if (insertError) {
                    console.error(insertError);
                    return res.status(500).json({ error: "Error al registrar el usuario" });
                }

                res.json({ Status: "Perfecto" });
            });
        });
    });
})

export default router
