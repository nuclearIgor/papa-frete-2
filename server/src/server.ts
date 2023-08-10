import * as http from 'http'
import dotenv from 'dotenv'
import app from "./app";
import {disconnectDb, initDb} from "../database";

dotenv.config()

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

async function main() {
    server.listen(PORT, () => {
        initDb()
        console.log(`listening on ${PORT}`)
    })
}

main().catch(e => console.log(e)).finally(async () => await disconnectDb)
