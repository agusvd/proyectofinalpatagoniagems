import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../db.js';

// Definir una clave secreta para firmar y verificar los tokens JWT
const secretKey = "jwt-secret-key";

const router = express.Router();

// Middleware de autenticación
const auth = (req, res, next) => {
    const token = req.cookies.token; // Obtener el token JWT de las cookies de la solicitud
    if (token) {
        // Verificar el token con la clave secreta
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
// Ruta para el panel de control (dashboard)
router.get('/dashboard', auth, (req, res) => {
    return res.json({ Status: 'Perfecto' });
});


// INVENTARIO DE PRODUCTOS

// Ruta para obtener el inventario de productos
router.get('/dashboard/inventario', (req, res) => {
    const sql = "SELECT id, nombre, categoria_id, cantidad_gramos, cantidad_ml, stock, descripcion, imagen, precio, es_destacado FROM productos";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error"); // Devolver un mensaje de error si ocurre un error en la consulta a la base de datos
        return res.json(data); // Devolver los datos obtenidos de la base de datos como respuesta JSON
    });
});
// ruta para el formulario de crear productos
router.post('/dashboard/inventario/agregar', (req, res) => {
    const sql = "INSERT INTO productos (nombre, categoria_id, cantidad_gramos, cantidad_ml, stock, descripcion, imagen, precio, es_destacado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.nombre,
        req.body.categoria_id,
        req.body.cantidad_gramos || null,
        req.body.cantidad_ml || null,
        req.body.stock,
        req.body.descripcion,
        req.body.imagen,
        req.body.precio,
        req.body.es_destacado,
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");// Devolver un mensaje de error si ocurre un error en la consulta a la base de datos
        }
        return res.json(data); // Devolver los datos obtenidos de la base de datos como respuesta JSON
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
// Ruta para obtener los datos de un producto específico para su actualización
router.put('/dashboard/actualizar/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE productos SET nombre = ?, categoria_id = ?, cantidad_gramos = ?, cantidad_ml = ?, stock = ?, descripcion = ?, imagen = ?, precio = ?, es_destacado = ? WHERE id = ?";
    const values = [
        req.body.nombre,
        req.body.categoria_id,
        req.body.cantidad_gramos || null,
        req.body.cantidad_ml || null,
        req.body.stock,
        req.body.descripcion,
        req.body.imagen,
        req.body.precio,
        req.body.es_destacado,
    ];
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err); // Devolver un mensaje de error si ocurre un error en la consulta a la base de datos
        return res.json('Actualizado'); // Devolver los datos obtenidos de la base de datos como respuesta JSON
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

// CATEGORIASSSS

// Obtener todas las categorías
router.get('/dashboard/categorias', (req, res) => {
    const sql = 'SELECT * FROM categoria_id';
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener las categorías' });
        }
        return res.json(data);
    });
});
// mostrar datos en el form de actualizar categorias
router.get('/dashboard/categorias/:id', (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM categoria_id WHERE id = ?"
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
// Crear una nueva categoría
router.post('/dashboard/categorias', (req, res) => {
    const sql = 'INSERT INTO categoria_id (categoria, imagen) VALUES (?, ?)';
    const values = [
        req.body.categoria,
        req.body.imagen,
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error al crear la categoría' });
        }
        return res.json(data);
    });
});
// Actualizar una categoría existente
router.put('/dashboard/categorias/:id', (req, res) => {
    const { id } = req.params;
    // Realiza la actualización de la categoría en la base de datos
    const sql = `UPDATE categoria_id SET categoria = ?, imagen = ? WHERE id = ?`;

    const values = [
        req.body.categoria,
        req.body.imagen,
    ];
    db.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar la categoría:', err);
            return res.status(500).json({ error: 'No se pudo actualizar la categoría' });
        }
        // La categoría se actualizó exitosamente
        return res.json({ message: 'Categoría actualizada correctamente' });
    });
});
// Eliminar una categoría
router.delete('/dashboard/categorias/:id', (req, res) => {
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


// USUARIOSSS

// Mostrar los usuarios registrados 
router.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        return res.json(data);
    });
})

// ESTADISTICAS
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


export default router