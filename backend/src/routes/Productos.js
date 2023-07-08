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

router.get('/tienda/:categoriaId', (req, res) => {
    const { categoriaId } = req.params;

    // Realiza la consulta a la base de datos para obtener los productos de la categoría
    const sql = `
      SELECT id, nombre, precio, categoria_id
      FROM productos
      WHERE categoria_id = ?
    `;
    db.query(sql, [categoriaId], (err, data) => {
        if (err) {
            console.error('Error al obtener los productos de la categoría:', err);
            return res.status(500).json({ error: 'No se pudieron obtener los productos' });
        }
        // Los productos se obtuvieron exitosamente
        return res.json(data);
    });
});



export default router

