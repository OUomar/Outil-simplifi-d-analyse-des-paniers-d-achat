# Documentation de l'API

Ce document fournit des informations détaillées sur les endpoints disponibles, les paramètres attendus, les exemples de requêtes et les réponses. Ces endpoints permettent d'accéder aux fonctionnalités principales du backend, telles que la gestion des produits, des ventes et des statistiques.
---

## Base URL

L'URL de base pour toutes les requêtes API est :
      http://localhost:3000/analytics

---

---

## Endpoints

### 1. **Total des ventes**

**Endpoint** : `GET /analytics/total_sales`

- **Description** : Retourne le montant total des ventes pour la période sélectionnée.
- **Paramètres de requête** :
  - `period` (optionnel) : Filtrer par période. Exemples : `7d`, `30d`, `12m`.
- **Exemple d'URL** :

GET http://localhost:3000/analytics/total_sales?period=7d

- **Réponse** (200 - Succès) :
```json
{
    "totalSales": 0,
    "period": "7d"
}
```
GET http://localhost:3000/analytics/total_sales?period=30d

- **Réponse** (200 - Succès) :
```json
{
    "totalSales": 774354.22,
    "period": "30d"
}
```
GET http://localhost:3000/analytics/total_sales?period=12m

- **Réponse** (200 - Succès) :
```json
{
    "totalSales": 258939864.87,
    "period": "12m"
}
```
### 2. **Produits les plus vendus**

**Endpoint** : `GET /analytics/trending_products`

- **Description** :Retourne une liste des 5 produits les plus vendus, avec leur nom, quantité vendue, et montant total des ventes.
- **Paramètres de requête** :Aucun.
- **Exemple d'URL** :

GET http://localhost:3000/analytics/trending_products

- **Réponse** (200 - Succès) :
```json
[
    {
        "_id": 53,
        "totalQuantity": 16902,
        "ProductName": "Keyboard",
        "Price": 36.12,
        "totalSales": 610500.24
    },
    {
        "_id": 23,
        "totalQuantity": 16804,
        "ProductName": "History Book",
        "Price": 491.14,
        "totalSales": 8253116.56
    },
    {
        "_id": 96,
        "totalQuantity": 16659,
        "ProductName": "Water Bottle",
        "Price": 203.14,
        "totalSales": 3384109.26
    },
    {
        "_id": 66,
        "totalQuantity": 16617,
        "ProductName": "Salad Spinner",
        "Price": 336.89,
        "totalSales": 5598101.13
    },
    {
        "_id": 34,
        "totalQuantity": 16617,
        "ProductName": "Dress",
        "Price": 170.79,
        "totalSales": 2838017.4299999997
    }
]
```
### 3. **Répartition des ventes par catégorie**

**Endpoint** : `GET /analytics/category_sales`

- **Description** :Retourne la répartition des ventes par catégorie, incluant le nombre et le pourcentage des ventes.
- **Paramètres de requête** :Aucun.
- **Exemple d'URL** :

GET http://localhost:3000/analytics/category_sales

- **Réponse** (200 - Succès) :
```json
{
    "message": "Répartition des ventes par catégorie récupérée avec succès.",
    "data": [
        {
            "category": "Clothing",
            "totalSales": 317992,
            "percentage": "19.91"
        },
        {
            "category": "Sports & Outdoors",
            "totalSales": 320690,
            "percentage": "20.08"
        },
        {
            "category": "Home & Kitchen",
            "totalSales": 319174,
            "percentage": "19.99"
        },
        {
            "category": "Books",
            "totalSales": 318935,
            "percentage": "19.97"
        },
        {
            "category": "Electronics",
            "totalSales": 320157,
            "percentage": "20.05"
        }
    ]
}
```
### 4. **Liste des produits**

**Endpoint** : `GET /analytics/products`

- **Description** :Retourne un tableau des produits avec leur nombre de ventes pour chaque produit.
- **Paramètres de requête** :Aucun.
- **Exemple d'URL** :

GET http://localhost:3000/analytics/products

- **Réponse** (200 - Succès) :
```json
[
    {
        "_id": 72,
        "totalSales": 16395,
        "ProductName": "Graphic Novel",
        "Category": "Books",
        "Price": 298.41
    },
    {
        "_id": 30,
        "totalSales": 15687,
        "ProductName": "Travel Guide",
        "Category": "Books",
        "Price": 466.85
    },
    {
        "_id": 89,
        "totalSales": 16148,
        "ProductName": "Tie",
        "Category": "Clothing",
        "Price": 262.37
    },
    ...
]
```