# Projet-Outil-simplifi-d-analyse-des-paniers-d-achat
Ce projet est une application web qui permet à un administrateur de site e-commerce de visualiser les statistiques principales des ventes et d'analyser les produits les plus vendus.

### Importation des datasets dans MongoDB

Avant d'installer et d'exécuter l'application, vous devez importer les datasets dans MongoDB Compass.

1. **Ouvrez MongoDB Compass** et connectez-vous à votre instance MongoDB.  
2. **Créez une base de données** appelée `ecommerce`.  
3. **Créez deux collections** dans cette base de données :  
   - `sales`  
   - `products`  
4. **Importez les fichiers CSV** dans les collections correspondantes :  
   - Importez le fichier `sales.csv` dans la collection `sales`.  
   - Importez le fichier `products.csv` dans la collection `products`.  
5. **Indexez la colonne `product_id`** dans les collections pour optimiser la récupération des données :  
   - Dans MongoDB Compass, accédez à la collection `products`.
   - Cliquez sur l’onglet **Indexes**.
   - Ajoutez un index en utilisant le champ `product_id` comme clé.  
   - Répétez l’opération pour la collection `sales` si nécessaire.

L'indexation améliore significativement les performances des requêtes de recherche utilisant le champ `product_id`.

## Fonctionnalités principales
- Affichage des ventes totales
- Liste des produits les plus vendus
- Répartition des ventes par catégorie (graphiques et tableaux)
- Filtrage des données par période (7 jours, 30 jours, 12 mois)

## Technologies utilisées
- **Frontend** : Vue.js 3, Vite
- **Backend** : Node.js, TypeScript, Express.js
- **Base de données** : MongoDB

---

### Installation et exécution

#### 1. Prérequis
- Node.js (>= 18.x)
- npm (ou yarn)
- MongoDB (ou MongoDB Atlas)

#### 2. Installation du Frontend
1. Accédez au répertoire `frontend` :
```bash
cd frontend
```
2. Installez les dépendances :
```bash
npm install
```
3. Lancez le serveur de développement :
```bash
npm run dev
```
4. Accédez à l'application sur http://localhost:5173.

#### 2.  Installation du Backend
1. Accédez au répertoire `frontend` :
```bash
cd backend
```
2. Installez les dépendances :
```bash
npm install
```
3. Configurez les variables d'environnement dans un fichier .env :

```bash
Exemple de fichier `.env` :  
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

5. Accédez au backend sur http://localhost:3000.

### Documentation API  
La documentation des endpoints est disponible dans le fichier [API_DOC.md](API_DOC.md). Vous y trouverez les détails sur les routes disponibles, les paramètres attendus, et les exemples de réponses. 
