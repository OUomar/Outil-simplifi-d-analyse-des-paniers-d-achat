<script lang="ts">
    import {defineComponent,ref,onMounted} from "vue";
    import {getTotalSales} from "@/api/analytics"; 
    import {useDark} from '@vueuse/core'

    const isDark = useDark()

    export default defineComponent({
        name: "TotalSales",
        setup() {
            const totalSales = ref(0);
            const selectedPeriod = ref("7d"); // Valeur par défaut (7 derniers jours)
            const isLoading = ref(false); 

            // Fonction pour récupérer les ventes totales selon la période sélectionnée
            const fetchSalesData = async () => {
                try {
                    isLoading.value = true; 
                    const period = selectedPeriod.value; // Valeur envoyée (par exemple '7d', '30d', '12m')
                    totalSales.value = await getTotalSales(period); 
                } catch (error) {
                    console.error("Erreur lors de la récupération des ventes totales :", error);
                } finally {
                    isLoading.value = false; // Arrête le chargement une fois les données récupérées
                }
            };

            onMounted(() => {
                fetchSalesData();
            });

            return {
                totalSales,
                selectedPeriod,
                fetchSalesData,
                isLoading,
            };
        },
    });
</script>

<template>
    <div class="flex flex-col items-center w-full  p-4 space-y-6">
        <!-- Menu déroulant pour sélectionner une période -->
        <div class="w-full max-w-lg flex items-center space-x-6">
            <!-- Label -->
            <label for="time-period" class="text-gray-800 dark:text-white font-medium whitespace-nowrap">
                Sélectionnez une période :
            </label>

            <select v-model="selectedPeriod" @change="fetchSalesData" id="time-period"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-gray-900  bg-white dark:bg-gray-800  dark:text-white">
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="12m">12 derniers mois</option>
            </select>
        </div>

        <!-- Section Ventes totales -->
        <div class=" w-full max-w-lg  transform ">
            <!-- Loader affiché pendant le chargement -->
            <div v-if="isLoading" class="flex justify-center items-center h-16">
                <div class="w-8 h-8 border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin"></div>
            </div>

            <!-- Afficher les ventes totales -->
            <p v-else class="text-md font-medium subpixel-antialiased text-gray-900 dark:text-white">
                le montant total des ventes réalisées pour cette période est :
                <span v-if="totalSales.totalSales !== undefined" class="text-white text-2xl bg-[#4CADAD] px-2 rounded">
                    {{ totalSales . totalSales . toLocaleString() }} €
                </span>
            </p>
        </div>
    </div>
</template>


<style scoped>


</style>
