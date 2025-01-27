import cors from 'cors'

export const corsOptions = {
  origin: ['http://localhost:5173', "http://0.0.0.0:5173", "http://192.168.1.14:3000", "http://192.168.1.14:5173"], // Use the base URL without the `/auth` path
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

export default cors(corsOptions)
