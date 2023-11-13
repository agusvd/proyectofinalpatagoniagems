import express from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const secretKey = "jwt-secret-key";

router.post('/login', (req, res) => {
    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.json({ Error: "Login Error SQL index.js" });
        }

        if (data.length > 0) {
            bcrypt.compare(
                req.body.contraseña.toString(),
                data[0].contraseña,
                (err, response) => {
                    if (err) {
                        console.error("Error en la comparación de la contraseña:", err);
                        return res.json({ Error: "Error en la comparacion de la contraseña" });
                    }

                    if (response) {
                        const id = data[0].id;
                        const role = data[0].role;
                        const nombre = data[0].nombre;
                        const apellido = data[0].apellido;
                        const email = data[0].email;
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
                                id,
                                nombre,
                                apellido,
                                role,
                                isAdmin,
                                email,
                            },
                            secretKey,
                            { expiresIn: "3h" }
                        );

                        res.cookie("token", token);
                        console.log("token:", token);
                        console.log("Usuario:", nombre, apellido, email, "Tipo:", role, "ID:", id);
                        return res.json({ Status: "Perfecto", token, message });
                    } else {
                        console.log("Contraseña incorrecta");
                        return res.json({ Error: "Contraseña invalida" });
                    }
                }
            );
        } else {
            console.log("No existe este email");
            return res.json({ Error: "No existe este email" });
        }
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    console.log('Token eliminado');
    return res.json({ Status: "Perfecto" });
});

export default router;
