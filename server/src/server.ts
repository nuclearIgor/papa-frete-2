import * as http from 'http'
import dotenv from 'dotenv'
import app from "./app";
import {initDb} from "../database";

dotenv.config()

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
server.listen(PORT, () => {
    initDb()
    console.log(`listening on ${PORT}`)
})