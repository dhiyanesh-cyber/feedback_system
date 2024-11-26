import cors from 'cors';

export const corsOptions = {
  origin: 'http://localhost:5173', // Use the base URL without the `/auth` path
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);
