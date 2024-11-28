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
const express_1 = require("express");
const analytics_controller_1 = require("../controllers/analytics.controller");
const analytics_controller_2 = require("../controllers/analytics.controller");
const analytics_controller_3 = require("../controllers/analytics.controller");
const analytics_controller_4 = require("../controllers/analytics.controller");
const router = (0, express_1.Router)();
router.get('/analytics/total_sales', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, analytics_controller_2.getTotalSales)(req, res);
}));
router.get('/analytics/trending_products', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, analytics_controller_1.getTrendingProducts)(req, res);
}));
router.get('/products', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, analytics_controller_3.getProductsWithSales)(req, res);
}));
router.get('/analytics/category_sales', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, analytics_controller_4.getCategorySalesAnalytics)(req, res);
}));
exports.default = router;
