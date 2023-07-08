import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/productos', (req, res) => {
    const sql = "SELECT id, nombre, precio, categoria_id FROM productos";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error")
        return res.json(data)
    })
});




export default router

