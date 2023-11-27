import app from './app.js'
import { PORT } from './config.js'
import db from './db.js'


app.listen(PORT, () => {
    console.log(">> Backend contectado correctamente <<")
})