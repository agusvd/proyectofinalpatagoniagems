import mercadopago from 'mercadopago'
import express from 'express'
import db from '../db.js';

const router = express.Router()

mercadopago.configure({
    access_token: 'TEST-2931986456961868-112316-49e032a003c5d3954a230353340a8985-1563131036',
});

router.post("/create_preference", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            },
        ],
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
        })
        
})

export default router