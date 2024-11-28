<script lang="ts">
    import {defineComponent,ref,onMounted,computed} from "vue";
    import {getProducts} from "@/api/analytics";
    import {Bar} from "vue-chartjs";
    import {Chart as ChartJS,Title,Tooltip,Legend,BarElement,CategoryScale,LinearScale} from "chart.js";
    import {useDark} from '@vueuse/core'
    // Enregistrement des composants de Chart.js
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

    const isDark = useDark()

    export default defineComponent({
        name: "SalesChart",
        components: {
            Bar,
        },
        setup() {
            const products = ref([]); // Liste des produits
            const loading = ref(true); 

            // Fonction pour récupérer les données des produits
            const fetchProductSales = async () => {
                try {
                    const response = await getProducts(); 
                    products.value = Array.isArray(response) ? response : [];
                } catch (error) {
                    console.error("Erreur lors de la récupération des produits", error);
                } finally {
                    loading.value = false;
                }
            };

            // Appel initial pour récupérer les données des produits
            onMounted(() => {
                fetchProductSales();
            });

            // Données du graphique en barres
            const barChartData = computed(() => {
                if (!Array.isArray(products.value)) return {
                    labels: [],
                    datasets: []
                };

                const labels = products.value.map((item) => item.ProductName); // Noms des produits
                const data = products.value.map((item) => item.totalSales); // Ventes totales

                return {
                    labels: labels,
                    datasets: [{
                            label: "Total des ventes par ce produit est ",
                            data: data,
                            backgroundColor: "#36A2EB",
                        },

                    ],
                };
            });

            // Options du graphique
            const chartOptions = computed(() => ({
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true, // commencer  L'axe Y à partir de  zéro
                    },
                },
                plugins: {
                    datalabels: {
                        display: false, // Désactive les labels de données
                    },
                },
            }));

            return {
                products,
                loading,
                barChartData,
                chartOptions,
            };
        },
    });
</script>

<template>
    <div class="flex flex-col items-center dark:bg-gray-800  min-h-screen  p-8">
        <!-- Section Ventes par Produit -->
        <div class="bg-whit  dark:bg-gray-800  p-6 w-full mb-8">

            <!-- Affichage du chargement -->
            <div v-if="loading" class="flex justify-center items-center h-16">
                <div class="w-8 h-8 border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin"></div>
            </div>

            <!-- Graphique en barres -->
            <div v-if="!loading" class="mb-8 dark:text-white">
                <Bar class="  dark:text-white" :data="barChartData" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>
