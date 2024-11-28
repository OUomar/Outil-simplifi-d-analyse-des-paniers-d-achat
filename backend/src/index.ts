import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/analyticsDB';
import analyticsRoutes from './routes/analytics.routes';
import cors from 'cors';

dotenv.config();  // Chargement des variables d'environnement

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
connectDB();

// Routes
app.use('/', analyticsRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
