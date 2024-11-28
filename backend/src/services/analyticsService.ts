import Product from '../models/product.model';
import Sale from '../models/sale.model';


/************************ Service1)  calculer les ventes totales************************/
export const calculateTotalSales = async (period: string) => {
  const currentDate = new Date();
  let startDate: Date;

  // Déterminer la date de début en fonction de la période
  switch (period) {
      case '7d': // 7 derniers jours
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - 7);
          break;
      case '30d': // 30 derniers jours
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - 30);
          break;
      case '12m': // 12 derniers mois
          startDate = new Date(currentDate);
          startDate.setFullYear(currentDate.getFullYear() - 1);
          break;
      default:
          throw new Error('Invalid period selected. Use 7d, 30d, or 12m.');
  }

  // Calculer les ventes totales pour la période donnée
  const totalSales = await Sale.aggregate([
      {
          $match: {
              Date: { $gte: startDate, $lte: currentDate }, // Filtrer par période
          },
      },
      {
          $lookup: {
              from: 'products', // Nom de la collection 'Products'
              localField: 'ProductID', // Champ de liaison dans la collection 'Sales'
              foreignField: 'ProductID', // Champ correspondant dans la collection 'Products'
              as: 'productDetails', // Alias pour les détails des produits
          },
      },
      {
          $unwind: '$productDetails', // Décompose le tableau des produits liés
      },
      {
          $group: {
              _id: null, // Regrouper tous les documents
              total: { $sum: { $multiply: ['$Quantity', '$productDetails.Price'] } }, // Calcul total
          },
      },
  ]);

  return totalSales[0]?.total || 0; // Retourne le total ou 0 si aucune vente
};


/*************************  Service 2) pour calculer les ventes par produit**********************/
export const getTrendingProductsService = async () => {
  try {
    // Agrégation pour calculer les quantités vendues et les ventes par produit
    const trendingProducts = await Sale.aggregate([
      {
        $group: {
          _id: '$ProductID', // Regrouper par ProductID
          totalQuantity: { $sum: '$Quantity' }, // Total des quantités vendues
        },
      },
      {
        $lookup: {
          from: 'products', // Joindre avec la collection des produits
          localField: '_id', // Champ de jointure dans la collection Sale
          foreignField: 'ProductID', // Champ de jointure dans la collection products
          as: 'productDetails', // Stocker les détails du produit
        },
      },
      {
        $unwind: '$productDetails', // Décompacter les détails du produit
      },
      {
        $project: {
          ProductName: '$productDetails.ProductName', // Nom du produit
          Price: '$productDetails.Price', // Prix unitaire du produit
          totalQuantity: 1, // Quantité totale vendue
          totalSales: { 
            $multiply: ['$productDetails.Price', '$totalQuantity'] // Calcul des ventes par produit
          },
        },
      },
      {
        $sort: { totalQuantity: -1 }, // Trier par total des ventes, du plus élevé au plus bas
      },
      {
        $limit: 5, // Limiter aux 3 produits les plus rentables
      },
    ]);

    return trendingProducts; // Retourner les produits les plus vendus
  } catch (error) {
    console.error('Erreur lors de l\'aggrégation des produits tendances:', error);
    throw new Error('Impossible de récupérer les produits tendance');
  }
};


/******Service 3) récuperer les ventes par catégorie et caluculer le nombre et le porcentage des ventes ***/ 
export const getCategorySales = async () => {
  //Récupérer les données d'agrégation
  const salesByCategory = await Sale.aggregate([
      {
          $lookup: {
              from: 'products', // Liaison avec la collection "products"
              localField: 'ProductID', // Champ dans "sales"
              foreignField: 'ProductID', // Champ correspondant dans "products"
              as: 'productDetails', // Résultat jointure
          },
      },
      {
          $unwind: '$productDetails', // Transformer le tableau de jointure en document
      },
      {
          $group: {
              _id: '$productDetails.Category', // Grouper par catégorie
              totalSales: { $sum: '$Quantity' }, // Nombre total de ventes par catégorie
          },
         
      },
      
  ]);

  //Calculer le pourcentage des ventes
  const totalSales = salesByCategory.reduce((sum, category) => sum + category.totalSales, 0);

  const salesWithPercentage = salesByCategory.map((category) => ({
      category: category._id,
      totalSales: category.totalSales,
      percentage: ((category.totalSales / totalSales) * 100).toFixed(2), // Calcul du pourcentage
  }));
  
  return salesWithPercentage;
};


/******************************Service 4) récuperer  les ventes par produit *******************************/
export const getProductsWithSalesService = async () => {
  // Pipeline d'agrégation pour calculer les ventes par produit
  const productsWithSales = await Sale.aggregate([
    {
      $group: {
        _id: '$ProductID', // Grouper par ID de produit
        totalSales: { $sum: '$Quantity' }, // Somme des quantités vendues
      },
    },
    {
      $lookup: {
        from: 'products', // Relier avec la collection des produits
        localField: '_id',
        foreignField: 'ProductID',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails', // Décompacter les détails du produit
    },
    {
      $project: {
        ProductName: '$productDetails.ProductName',
        Category: '$productDetails.Category',
        Price: '$productDetails.Price',
        totalSales: 1,
      },
    },
  ]);

  return productsWithSales;
};