import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/usuarios', (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error"); // Devolver un mensaje de error si ocurre un error en la consulta a la base de datos
        return res.json(data); // Devolver los datos obtenidos de la base de datos como respuesta JSON
    });
})

export default router