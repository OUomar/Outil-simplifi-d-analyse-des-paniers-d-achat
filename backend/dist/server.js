"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config(); // Chargement des variables d'environnement
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connexion à MongoDB
(0, db_1.default)();
// Routes
app.use('/api/products', productRoutes_1.default);
// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
