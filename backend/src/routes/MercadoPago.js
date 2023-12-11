import express from 'express';
import mercadopago from 'mercadopago';

const router = express.Router();

mercadopago.configure({
    access_token: "TEST-2550155760366803-112315-85a9859690c381dc1a3acf947d087769-1561246425",
});

router.post("/checkout", async (req, res) => {
    console.log("Request Body:", req.body);

    try {
        const preference = {
            items: req.body.items.map(item => ({
                title: item.description,
                unit_price: Number(item.price),
                quantity: Math.floor(Number(item.quantity)),
            })),
            back_urls: {
                success: "http://localhost:5173/success",
                failure: "http://localhost:5173/failure",
            },
            auto_return: "approved",
        };
        const respuesta = await mercadopago.preferences.create(preference);
        console.log(respuesta);
        res.status(200).json(respuesta.response.init_point)

    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
});


router.get("/success", async  (req, res) => {
    try {
        const paymentId = req.query.payment_id;
        const paymentStatus = req.query.status;

        const transactionDetails = {
            paymentId,
            paymentStatus,
        };
        console.log(paymentId)
        console.log(paymentStatus)

        // Devuelve los detalles al frontend
        res.json({ success: true, transactionDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error al obtener detalles del pago" });
    }
});

router.get("/failure", (req, res) => {
    res.send("Pago fallido");
});
export default router;

