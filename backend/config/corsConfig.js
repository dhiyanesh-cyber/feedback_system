import cors from 'cors';

export const corsOptions = {
  origin: 'http://192.168.1.63:5173', // Use the base URL without the `/auth` path
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);
