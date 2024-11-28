<script lang="ts">
    import {defineComponent,ref,onMounted,computed} from 'vue'
    import {getCategorySales} from '@/api/analytics'
    import {Pie} from 'vue-chartjs'
    import {Chart as ChartJS,Title,Tooltip,Legend,ArcElement,} from 'chart.js'
    import ChartDataLabels from 'chartjs-plugin-datalabels'

    // Enregistrement des composants de Chart.js et du plugin datalabels
    ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels)

    export default defineComponent({
        name: 'CategorySales',
        components: {
            Pie,
        },
        setup() {
            const categorySales = ref([]) // Données de ventes par catégorie
            const loading = ref(true)
            const chartRef = ref(null) // Référence au graphique

            // Fonction pour récupérer les données de répartition des ventes par catégorie
            const fetchCategorySales = async () => {
                try {
                    const response = await getCategorySales()
                    categorySales.value = Array.isArray(response.data) ? response.data : []
                } catch (error) {
                    console.error('Erreur lors de la récupération des ventes par catégorie', error)
                } finally {
                    loading.value = false
                }
            }

            onMounted(() => {
                fetchCategorySales()
            })

            // Données du graphique en secteurs
            const pieChartData = computed(() => {
                if (!Array.isArray(categorySales.value)) return {
                    labels: [],
                    datasets: []
                }

                const labels = categorySales.value.map((item) =>
                    `${item.category} (${item.percentage}%)`) // Ajouter le pourcentage au label
                const data = categorySales.value.map((item) => item.totalSales)

                return {
                    labels,
                    datasets: [{
                        label: 'Répartition des ventes',
                        data,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0','#FF9F40'],
                        hoverOffset: 4,
                    }, ],
                }
            })

            // Options personnalisées pour le graphique
            const pieChartOptions = computed(() => ({
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                const index = tooltipItem.dataIndex
                                const categoryData = categorySales.value[index]
                                const percentage = categoryData.percentage
                                const totalSales = categoryData.totalSales
                                return `${categoryData.category}: Nombre des ventes ${totalSales.toLocaleString()}  \npourcentage des ventes (${percentage}%)`
                            },
                        },
                    },
                    datalabels: {
                        display: true,
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        formatter: (value, context) => {
                            const percentage = context.chart.data.labels[context.dataIndex].split('(')[1].split(')')[0] 
                            return `${percentage}`
                        },
                    },
                },
            }))

            // Fonction pour télécharger l'image du graphique
            const downloadChartImage = () => {
                if (chartRef.value) {
                    const chartInstance = chartRef.value.chart
                    const imageUrl = chartInstance.toBase64Image()
                    const a = document.createElement('a')
                    a.href = imageUrl
                    a.download = 'category_sales_chart.png' 
                    a.click()
                }
            }

            return {
                categorySales,
                loading,
                pieChartData,
                pieChartOptions,
                chartRef, 
                downloadChartImage, 
            }
        },
    })
</script>

<template>
    <div class="flex flex-col items-center">
        <!-- Affichage du chargement -->
        <div v-if="loading" class="flex justify-center items-center h-16">
            <div class="w-8 h-8 border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin"></div>
        </div>

        <!-- Graphique en secteurs -->
        <div v-if="!loading" class=" chart-container mb-8">
            <Pie ref="chartRef" :data="pieChartData" :options="pieChartOptions" />
        </div>

        <!-- Bouton de téléchargement -->
        <div v-if="!loading" class="text-center">
            <button @click="downloadChartImage"
                class="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-colors">
                Télécharger le graphique
            </button>
        </div>
    </div>
</template>

<style scoped>
    .chart-container {
        width: 500px;
        height: 500px;
    }
</style>
