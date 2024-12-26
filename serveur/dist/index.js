"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const camRoute_1 = __importDefault(require("./routes/camRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const app = (0, express_1.default)();
// Middleware pour parser les requêtes JSON
app.use(body_parser_1.default.json());
// Configuration CORS pour toutes les requêtes
app.use((0, cors_1.default)());
// Route de test
app.get('/', (req, res) => {
    res.send('Serveur de la régie CAM');
});
// Utilisation des routes définies dans userRoutes
app.use('/api/v1/', camRoute_1.default);
app.use('/api/v1/', adminRoute_1.default);
// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
