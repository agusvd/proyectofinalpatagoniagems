import express from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const secretKey = "jwt-secret-key";


router.post('/login', (req, res) => {

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login Error SQL index.js" });
        if (data.length > 0) {
            bcrypt.compare(
                req.body.contraseña.toString(),
                data[0].contraseña,
                (err, response) => {
                    if (err)
                        return res.json({
                            Error: "Error en la comparacion de la contraseña",
                        });
                    if (response) {
                        const role = data[0].role;
                        const nombre = data[0].nombre;
                        const apellido = data[0].apellido;
                        let isAdmin = false;
                        let message = "";

                        if (role === "admin") {
                            isAdmin = true;
                            message = "isAdmin";
                        } else {
                            message = "isUser";
                        }
                        const token = jwt.sign(
                            {
                                nombre,
                                apellido,
                                role,
                                isAdmin,
                            },
                            secretKey,
                            { expiresIn: "3h" }
                        );
                        res.cookie("token", token); // Almacenar token en una cookie
                        console.log(token);
                        console.log(nombre + " " + apellido + " tipo: " + role);
                        return res.json({ Status: "Perfecto", token, message });
                    } else {
                        return res.json({ Error: "Contraseña invalida" });
                    }
                }
            );
        } else {
            return res.json({ Error: "No existe este email" });
        }
    });
});



router.get('/logout', (req, res) => {
    res.clearCookie('token') // eliminar la cookie del token
    console.log('Token eliminado')
    return res.json({Status: "Perfecto"})
})

export default router