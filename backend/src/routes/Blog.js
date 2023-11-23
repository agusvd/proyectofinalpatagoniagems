import express from 'express';
import db from '../db.js';

const router = express.Router()


//OBTENER TODOS LOS POST
router.get("/blogs", (req, res) => {
    const q = "SELECT * FROM blog"
    db.query(q, (err, data) => {
        if (err) {
            console.error("error al ejecutar la consulta", err)
            return res.status(500).json({ err: "Error al obtener los post" });
        } else {
            return res.status(200).json(data)
        }
    })
})

//OBTENER UN POST POR ID
router.get("/blog/post/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM blog WHERE id = ?";

    db.query(q, [id], (err, data) => {
        if (err) {
            console.error("error al ejecutar la consulta", err)
            return res.status(500).json({ err: "error al obtener PostID" })

        } else {
            return res.status(200).json(data);
        }
    });
})

//AÑADIR NUEVO POST
router.post("/blog/create", (req, res) => {
    const { titulo, descripcion, img, fechaPublicacion } = req.body;

    const q = "INSERT INTO blog (titulo, descripcion, img, fechaPublicacion) VALUES (?, ?, ?, ?)"

    const values = [
        req.body.titulo,
        req.body.descripcion,
        req.body.img || null,
        req.body.fechaPublicacion || null,
    ]

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Error al Ejecutar consula", err)
            return res.status(500).json({ err: "error al Agregar nuevo post" })
        } else {
            return res.status(200).json({ message: "Post agregado correctamente", data })
        }
    })
})

//ELIMINAR POST
router.delete("/blog/delete/:id", (req, res) => {
    const id = req.params.id
    const q = "DELETE FROM blog WHERE id = ?";

    db.query(q, [id], (err, data) => {
        if (err) {
            console.error("error al ejecutar consulta:", err)
            return res.status(500).json({ err: "error Al eliminar el post" })
        } else {
            console.log("eL Post ha sido eliminado", data)
            return res.status(200).json({ message: "El post ha sido eliminado correctamente", data })
        }
    })
})

//ACTUALIZAR / MODIFICAR POST
router.put("/blog/update/:id", (req, res) => {
    const id = req.params.id
    const { titulo, descripcion, date, img, fechaPublicacion } = req.body
    const q = "UPDATE blog SET titulo= ?, descripcion= ?  WHERE id=?";

    const values = [titulo, descripcion, id]
    db.query(q, values, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json("el post no ha sido actualizado", err)

        } else {
            console.log("el post ha sido actualizado", data)
            return res.json({ message: "el post  ha sido actualizado", data })
        }
    })
});


export default router;