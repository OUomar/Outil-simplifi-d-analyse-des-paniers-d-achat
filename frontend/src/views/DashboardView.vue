<script lang="ts">
import Card from "@/components/Card.vue";
import TotalSales from "@/components/TotalSales.vue";
import CategorySales from "@/components/CategorySales.vue";
import TopSellingProducts from "@/components/TopSellingProducts.vue";
import SalesChart from "@/components/SalesChart.vue";
import ProductTable from "@/components/ProductTable.vue";

export default {
  name:"DashboardView.vue",
  components: {
    Card,
    TotalSales,
    CategorySales,
    TopSellingProducts,
    SalesChart,
    ProductTable,
  },
};
</script>


<template>
<div class=" py-2 dark:bg-black">
        <!-- Première ligne : Ventes totales & Répartition des ventes par catégorie -->
        <div class="flex flex-wrap gap-4  mx-4 mt-4">
            <div class="flex-1">
                <!-- Première colonne : Ventes totales -->
                <Card title="Ventes totales">
                    <TotalSales />
                </Card>
                <!-- Deuxième colonne : Ventes totales -->
                <Card title="Répartition des ventes par catégorie">
                    <CategorySales />
                </Card>
            </div>

            <!-- Deuxième colonne : Top 5 des produits les plus vendus, triés par quantité -->
            <div class="flex-1 flex">
                <Card title="Top 5 des produits les plus vendus, triés par quantité">
                    <TopSellingProducts />
                </Card>
            </div>
        </div>

        <!-- Deuxième ligne : Histogramme des ventes par produit -->
        <div class="row mx-4">
            <Card title="Histogramme des ventes par produit">
                <SalesChart />
            </Card>
        </div>

        <!-- Troisième ligne : Une seule colonne -->
        <div class="row single-column mx-4 mb-4">
            <Card title="Liste des produits avec le nombre de ventes pour chaque produit">
                <ProductTable />
            </Card>
        </div>
    </div>
</template>


/* Ajoutez des styles globaux ou spécifiques ici */
<style scoped>

</style>
