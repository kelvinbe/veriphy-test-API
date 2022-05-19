import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



import userRoutes from './routes/users.js'

const app = express()




app.use(bodyParser.json({ limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}))
app.use(cors())

const dbUrl = 'mongodb+srv://Kelvin:1234@cluster0.8no4u.mongodb.net/veriphy?retryWrites=true&w=majority'
const port = process.env.PORT || 5000



mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
                .then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
                .catch((error) => console.error(error))


app.use('/user', userRoutes)

console.log('hey')

