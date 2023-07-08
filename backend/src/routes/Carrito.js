import express from 'express';
import db from '../db.js';

const router = express.Router();

// Ruta para obtener los productos del carrito
router.get('/carrito', (req, res) => {
    const sql = `
  SELECT c.id, c.usuario_id, c.producto_id, c.precio_total, c.cantidad_total, p.nombre, p.precio, cat.categoria
  FROM carrito c
  JOIN productos p ON c.producto_id = p.id
  JOIN categoria_id cat ON p.categoria_id = cat.id
`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al obtener los productos del carrito:', err);
            return res.status(500).json({ error: 'No se pudieron obtener los productos del carrito' });
        }

        // Los productos del carrito se obtuvieron exitosamente
        return res.json(result);
    });
});

// Ruta para agregar un producto al carrito
router.post('/carrito', (req, res) => {
    const { usuario_id, producto_id, precio_total, cantidad_total } = req.body;

    const sql = 'INSERT INTO carrito (usuario_id, producto_id, precio_total, cantidad_total) VALUES (?, ?, ?, ?)';
    const values = [usuario_id, producto_id, precio_total, cantidad_total];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al agregar el producto al carrito:', err);
            return res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
        }

        // El producto se agregó exitosamente al carrito
        return res.json({ message: 'Producto agregado al carrito correctamente' });
    });
});

// Ruta para eliminar un producto del carrito
router.delete('/carrito/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM carrito WHERE id = ?';
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la producto del carrito' });
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.json(data);
    });
});

export default router;
