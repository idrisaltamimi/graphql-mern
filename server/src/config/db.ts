import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: `${__dirname}/../../.env` })

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_USER)

  console.log(`MongoDB is Connected ${connection.connection.host}`)
}

export default connectDB