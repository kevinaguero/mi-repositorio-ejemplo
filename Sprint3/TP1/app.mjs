import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/api/superheroes', superHeroRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${3000}`);
});