import express from 'express'
import db from '../db.js'
import bcrypt from 'bcrypt'
import { body } from 'express-validator'

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
router.post('/register', validarRegistro(), async (req, res) => {
    try {

        // valores que guardamos del formulario
        const { nombre, apellido, email, contraseña } = req.body
        
        // Hash de la contraseña usando bcrypt
        const hashedPassword = await bcrypt.hash(contraseña, rondas)

        // Comando MYSQL 
        const sql = "INSERT INTO usuarios (`nombre`, `apellido`, `email`, `contraseña`, `role`) VALUES (?, ?, ?, ?, ?)"

        // Ejecucion de la consulta SQL usando promesas
        await db.query(sql, [capitalize(nombre), capitalize(apellido), email, hashedPassword, 'user'])

        res.json({ Status: "Perfecto" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Error al resgitrar el usuario "})
    }
})

export default router