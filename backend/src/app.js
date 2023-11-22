import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
const multer = require('multer');
const path = require('path');
import cookieParser from 'cookie-parser'
import LoginRouter from './Routes/Login.js'
import RegisterRouter from './Routes/Register.js'
import MiddlewareRouter from './routes/Middleware.js'
import DashboardRouter from './routes/Dashboard.js'
import ProductosRoutes from './routes/Productos.js'
import CarritoRoutes from './routes/Carrito.js'
import PerfilRoutes from './routes/Perfil.js'
import UsuariosRoutes from './routes/Usuarios.js'

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());

// Configura Multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Rutas
app.use(LoginRouter);
app.use(RegisterRouter);
app.use(MiddlewareRouter);
app.use(DashboardRouter);
app.use(ProductosRoutes);
app.use(CarritoRoutes);
app.use(PerfilRoutes);
app.use(UsuariosRoutes)




export default app;