import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/carrito', (req, res) => {
    const { usuario_id } = req.query;

    const sql = `
        SELECT c.id, c.usuario_id, c.producto_id, c.precio_total, c.cantidad_total, p.nombre, p.precio, cat.categoria
        FROM carrito c
        JOIN productos p ON c.producto_id = p.id
        JOIN categoria_id cat ON p.categoria_id = cat.id
        WHERE c.usuario_id = ?
    `;

    db.query(sql, [usuario_id], (err, result) => {
        if (err) {
            console.error('Error al obtener los productos del carrito:', err);
            return res.status(500).json({ error: 'No se pudieron obtener los productos del carrito' });
        }

        // Los productos del carrito se obtuvieron exitosamente
        return res.json(result);
    });
});

// Ruta para agregar un producto al carrito
// Ruta para agregar un producto al carrito
router.post('/carrito', (req, res) => {
    const { usuario_id, producto_id, precio_total, cantidad_total } = req.body;

    // Verificar si el producto ya existe en el carrito del usuario
    const checkProductQuery = 'SELECT id FROM carrito WHERE usuario_id = ? AND producto_id = ?';
    const checkProductValues = [usuario_id, producto_id];

    db.query(checkProductQuery, checkProductValues, (checkProductErr, checkProductResult) => {
        if (checkProductErr) {
            console.error('Error al verificar el producto en el carrito:', checkProductErr);
            return res.status(500).json({ error: 'Error al verificar el producto en el carrito' });
        }

        if (checkProductResult.length > 0) {
            // El producto ya existe en el carrito
            console.log("producto ya existe")
            return res.json({ error: 'El producto ya está en el carrito' });
        }

        // El producto no existe en el carrito, proceder a la inserción
        const insertProductQuery = 'INSERT INTO carrito (usuario_id, producto_id, precio_total, cantidad_total) VALUES (?, ?, ?, ?)';
        const insertProductValues = [usuario_id, producto_id, precio_total, cantidad_total];

        db.query(insertProductQuery, insertProductValues, (insertProductErr, insertProductResult) => {
            if (insertProductErr) {
                console.error('Error al agregar el producto al carrito:', insertProductErr);
                return res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
            }

            // El producto se agregó exitosamente al carrito
            return res.json({ message: 'Producto agregado al carrito correctamente' });
        });
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

router.put('/carrito/:id', (req, res) => {
    const id = req.params.id;
    const { cantidad_total, precio_total } = req.body;

    const sql = 'UPDATE carrito SET cantidad_total = ?, precio_total = ? WHERE id = ?';
    const values = [cantidad_total, precio_total, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el producto en el carrito:', err);
            return res.status(500).json({ error: 'No se pudo actualizar el producto en el carrito' });
        }

        // El producto se actualizó exitosamente en el carrito
        return res.json({ message: 'Producto actualizado en el carrito correctamente' });
    });
});



export default router;
