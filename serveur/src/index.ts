import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import camRoute from './routes/camRoute';
import adminRoute from './routes/adminRoute';

const app = express();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Configuration CORS pour toutes les requêtes
app.use(cors());

// Utilisation des routes définies dans userRoutes
app.use('/api/v1/', camRoute);

app.use('/api/v1/', adminRoute);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
