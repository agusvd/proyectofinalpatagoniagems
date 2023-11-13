import express from 'express'
import db from '../db.js'


const router = express.Router();

router.get('/perfil/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM usuarios WHERE id = ?"

    db.query(sql, [id], (err, data) => {
        console.log(data)
        if (err) return res.json('Error')
        return res.json(data)
    })
});

export default router