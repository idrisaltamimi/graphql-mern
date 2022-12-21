import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import schema from './schema/schema.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: `${__dirname}/../.env` })

const port = process.env.PORT || 5000

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`app is running at port ${port}`))