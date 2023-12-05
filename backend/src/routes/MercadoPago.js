import mercadopago from 'mercadopago'
import express from 'express'
import db from '../db.js';

const router = express.Router()

mercadopago.configure({
    access_token: 'TEST-2931986456961868-112316-49e032a003c5d3954a230353340a8985-1563131036',
});

router.post("/create_preference", (req, res) => {
    console.log("Request Body:", req.body);

    // Agregar la información del carrito desde req.body a la variable preference
    let preference = {
        items: req.body.items.map(item => ({
            title: item.description,
            unit_price: Number(item.price),
            quantity: Math.floor(Number(item.quantity)),
        })),
        back_urls: {
            success: "http://localhost:5173",
            failure: "http://localhost:5173",
            pending: "",
        },
        auto_return: "approved",
    };
    
    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id
            })
        })
        .catch(function (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al crear la preferencia' });
        })
});

export default router
