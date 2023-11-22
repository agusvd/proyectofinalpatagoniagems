import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
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