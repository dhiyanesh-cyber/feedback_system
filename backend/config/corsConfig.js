import cors from 'cors';

export const corsOptions = {
  // origin: 'https://feedback-hosting.vercel.app', // Use the base URL without the `/auth` path
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);
