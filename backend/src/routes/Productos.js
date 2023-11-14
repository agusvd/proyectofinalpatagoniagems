import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/productos', (req, res) => {
    const sql = "SELECT id, nombre, precio, categoria_id, es_destacado, cantidad_gramos, cantidad_ml, imagen FROM productos";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error")
        return res.json(data)
    })
});

router.get('/tienda/producto/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const sql = "SELECT * FROM productos WHERE nombre = ?"

    db.query(sql, [nombre], (err, data) => {
        if (err) return res.json('Error')
        return res.json(data)
    })
});

router.get('/productos/buscar', (req, res) => {
    const { searchText } = req.query;

    const sql = `
      SELECT id, nombre, precio, categoria_id, imagen
      FROM productos
      WHERE nombre LIKE ?
    `;
    db.query(sql, [`%${searchText}%`], (err, data) => {
        if (err) {
            console.error('Error al buscar productos:', err);
            return res.status(500).json({ error: 'No se pudieron buscar los productos' });
        }
        // Los productos se encontraron exitosamente
        return res.json(data);
    });
});

router.get('/tienda/:categoriaId', (req, res) => {
    const { categoriaId } = req.params;

    const sql = `
      SELECT id, nombre, precio, categoria_id, imagen
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

