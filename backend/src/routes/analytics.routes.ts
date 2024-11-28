import { Router } from 'express';
import { getTrendingProducts } from '../controllers/analyticsController';
import { getTotalSales } from '../controllers/analyticsController';
import { getProductsWithSales } from '../controllers/analyticsController';
import {  getCategorySalesAnalytics } from '../controllers/analyticsController';

const router = Router();
router.get('/analytics/total_sales', async(req,res)=>{
    await getTotalSales(req, res);
});

router.get('/analytics/trending_products', async (req, res, next) => {
    await getTrendingProducts(req, res);
  });
  router.get('/products', async (req, res, next) => {
    await getProductsWithSales(req, res);
  });
  router.get('/analytics/category_sales', async (req, res, next) => {
    await getCategorySalesAnalytics(req, res);
  });

export default router;
