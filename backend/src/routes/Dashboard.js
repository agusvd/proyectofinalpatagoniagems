import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const secretKey = "jwt-secret-key";

const router = express.Router();

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/404');
            } else {
                console.log(decodedToken);
                // Verificar si el usuario es administrador
                if (decodedToken.isAdmin) {
                    next(); // Permitir el acceso a usuarios administradores
                } else {
                    res.redirect('/404');
                }
            }
        });
    } else {
        res.redirect('/404');
    }
};

router.get('/dashboard', auth, (req, res) => {
    return res.json({ Status: 'Perfecto' });
});

router.get('/dashboard/inventario', (req, res) => {
    const sql = "SELECT id, nombre, precio, stock, es_destacado FROM productos";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error")
        return res.json(data)
    })
});


// ruta para el formulario de crear productos
router.post('/dashboard/inventario/agregar', (req, res) => {
    const sql = "INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, es_destacado) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.nombre,
        req.body.descripcion,
        req.body.precio,
        req.body.stock,
        req.body.categoria_id,
        req.body.es_destacado
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");
        }
        return res.json(data);
    });
});


// ruta para se muestre los productos en el form de actualizar
router.get('/dashboard/search/:id', (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM productos WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) return res.json('Error')
        return res.json(data)
    })
})

router.put('/dashboard/actualizar/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ?, es_destacado = ? WHERE id = ?";
    const values = [
        req.body.nombre,
        req.body.descripcion,
        req.body.precio,
        req.body.stock,
        req.body.categoria_id,
        req.body.es_destacado
    ];
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err);
        return res.json('Actualizado');
    });
});


router.delete('/dashboard/inventario/:id', (req, res) => {
    const sql = "DELETE FROM productos WHERE id = ?"
    const id = req.params.id
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error, en el servidor" })
        return res.json(result)
    })
})

router.get('/dashboard/total-productos', (req, res) => {
    const sql = "SELECT COUNT(*) AS total FROM productos";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        const total = data[0].total;
        return res.json({ total });
    });
});

router.get('/dashboard/valor-total-tienda', (req, res) => {
    const sql = "SELECT SUM(precio * stock) AS valorTotal FROM productos";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        const valorTotal = data[0].valorTotal || 0;
        return res.json({ valorTotal });
    });
});


router.get('/dashboard/cantidad-usuarios', (req, res) => {
    const sql = "SELECT COUNT(*) AS cantidad FROM usuarios";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener la cantidad de usuarios" });
        }
        const cantidad = result[0].cantidad;
        return res.json({ cantidad });
    });
});

// Obtener todas las categorías
router.get('/categorias', (req, res) => {
    const sql = 'SELECT * FROM categoria_id';
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las categorías' });
        }
        return res.json(data);
    });
});

// Obtener una categoría por su ID
router.get('/categorias/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM categoria_id WHERE id = ?';
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener la categoría' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        return res.json(data[0]);
    });
});

// Crear una nueva categoría
router.post('/categorias', (req, res) => {
    const { categoria } = req.body;
    const sql = 'INSERT INTO categoria_id (categoria) VALUES (?)';
    db.query(sql, [categoria], (err, data) => {
        if (err) {
            console.log(err); // Agrega esta línea para imprimir el error en el servidor
            return res.status(500).json({ error: 'Error al crear la categoría' });
        }
        return res.json(data);
    });
});

// Actualizar una categoría existente
router.put('/categorias/:id', (req, res) => {
    const { id } = req.params;
    const { categoria } = req.body;

    // Realiza la actualización de la categoría en la base de datos
    const sql = `
      UPDATE categoria_id
      SET categoria = ?
      WHERE id = ?
    `;
    db.query(sql, [categoria, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la categoría:', err);
            return res.status(500).json({ error: 'No se pudo actualizar la categoría' });
        }
        // La categoría se actualizó exitosamente
        return res.json({ message: 'Categoría actualizada correctamente' });
    });
});

// Eliminar una categoría
router.delete('/categorias/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM categoria_id WHERE id = ?';
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la categoría' });
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        return res.json(data);
    });
});



export default router