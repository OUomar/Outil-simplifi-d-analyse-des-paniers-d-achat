"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsWithSales = exports.getCategorySalesAnalytics = exports.getTrendingProducts = exports.getTotalSales = void 0;
const analytics_service_1 = require("../services/analytics.service");
const analytics_service_2 = require("../services/analytics.service");
const analytics_service_3 = require("../services/analytics.service");
const analytics_service_4 = require("../services/analytics.service");
const getTotalSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupérer la période depuis les paramètres de la requête
        const { period } = req.query;
        if (!period || typeof period !== 'string') {
            return res.status(400).json({ message: 'Period is required and must be a string.' });
        }
        // Appeler le service pour calculer les ventes totales
        const totalSales = yield (0, analytics_service_2.calculateTotalSales)(period);
        res.json({ totalSales, period });
    }
    catch (err) {
        if (err.message === 'Invalid period selected. Use 7d, 30d, or 12m.') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Error fetching total sales', error: err.message });
    }
});
exports.getTotalSales = getTotalSales;
const getTrendingProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trendingProducts = yield (0, analytics_service_1.getTrendingProductsService)();
        return res.status(200).json(trendingProducts);
    }
    catch (error) {
        console.error('Error fetching trending products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getTrendingProducts = getTrendingProducts;
const getCategorySalesAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salesData = yield (0, analytics_service_4.getCategorySales)();
        return res.status(200).json({
            message: 'Répartition des ventes par catégorie récupérée avec succès.',
            data: salesData,
        });
    }
    catch (error) {
        console.error('Erreur lors de la récupération des ventes par catégorie :', error);
        return res.status(500).json({
            message: 'Erreur interne du serveur.',
        });
    }
});
exports.getCategorySalesAnalytics = getCategorySalesAnalytics;
const getProductsWithSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Appel du service pour récupérer les produits et leurs ventes
        const productsWithSales = yield (0, analytics_service_3.getProductsWithSalesService)();
        return res.status(200).json(productsWithSales);
    }
    catch (error) {
        console.error('Error fetching products with sales:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getProductsWithSales = getProductsWithSales;
