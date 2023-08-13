import express from 'express'
import cors from 'cors'
import path from 'path'
import {errorHandler} from "./resources/common/middleware/errorHandler";
import authRouter from "./resources/auth/auth.routes";
import tomadoresRouter from "./resources/tomadores/tomadores.routes";
import prestadoresRouter from "./resources/prestadores/prestadores.routes";
import fretesRouter from "./resources/fretes/fretes.routes";
import candidaturasRouter from "./resources/candidaturas/candidaturas.routes";

const app = express()

app.use(cors({
    origin: ['https://monkfish-app-qk6za.ondigitalocean.app/*', 'http://localhost:5173']
}))

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api/auth', authRouter)
app.use('/api/tomadores', tomadoresRouter)
app.use('/api/prestadores', prestadoresRouter)
app.use('/api/fretes', fretesRouter)
app.use('/api/candidaturas', candidaturasRouter)

app.get("/api/status", (req, res) => {
    return res.json({msg: 'hello world'})
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use(errorHandler)
export default app
