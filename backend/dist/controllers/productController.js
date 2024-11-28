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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
// Exemple de méthode pour obtenir tous les produits
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find();
        res.json(products);
    }
    catch (err) {
        // Vérifier si l'erreur est une instance de Error
        if (err instanceof Error) {
            // Si c'est une instance de Error, on peut accéder à err.message
            res.status(500).json({ message: err.message });
        }
        else {
            // Si l'erreur n'est pas une instance de Error, on renvoie un message générique
            res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
        }
    }
});
exports.getAllProducts = getAllProducts;
