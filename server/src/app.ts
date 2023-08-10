import express from 'express'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(cors({
    origin: ['https://monkfish-app-qk6za.ondigitalocean.app/*', 'http://localhost:5173']
}))

app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get("/api/status", (req, res) => {
    return res.json({msg: 'hello world'})
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

export default app
