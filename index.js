const express = require('express')
const cors = require('cors')

const {dbConnection } = require('./db/config')

require('dotenv').config();



const app = express();

//Conexion a BD
dbConnection();


// configuracion de middlewares
app.use(cors())
app.use(express.json())


//rutas
app.use('/api', require('./routes/api.route'))

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`Server running on PORT: ${port}`)
})
