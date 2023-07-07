import mysql from 'mysql'
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} from './config.js'

// Configuracion de base de datos para conectarla
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
})

// Conexion a la base de datos
db.connect(error => {
    if(error) {
        console.error('Error al conectarse a la base de datos: ', error)
    } else {
        console.log('>> MySQL conectado correctamente <<')
    }
})

export default db