
<script setup>
    import { ref,computed,onMounted} from "vue";
    import {getProducts} from "@/api/analytics"; 
    import { useDark} from '@vueuse/core'
    // Gérer l'état du mode sombre
    const isDark = useDark()

    const products = ref([]);
    const loading = ref(true);
    const searchTerm = ref("");
    const sortColumn = ref("");
    const sortOrder = ref("");
    const currentPage = ref(1);
    const rowsPerPage = ref(5); 

    // Fonction pour récupérer les produits depuis l'API
    const fetchProducts = async () => {
        try {
            products.value = await getProducts();
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        } finally {
            loading.value = false;
        }
    };

    // Filtrer les produits par recherche
    const filteredProducts = computed(() => {
        if (!searchTerm.value) return products.value;
        return products.value.filter((product) =>
            product.ProductName.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
    });

    // Trier les produits
    const sortTable = (column) => {
        if (sortColumn.value === column) {
            sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
        } else {
            sortColumn.value = column;
            sortOrder.value = "asc";
        }

        const order = sortOrder.value === "asc" ? 1 : -1;

        products.value.sort((a, b) => {
            if (a[column] < b[column]) return -1 * order;
            if (a[column] > b[column]) return 1 * order;
            return 0;
        });
    };

    // Pagination des produits
    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / rowsPerPage.value));
    const paginatedProducts = computed(() => {
        const start = (currentPage.value - 1) * rowsPerPage.value;
        const end = start + rowsPerPage.value;
        return filteredProducts.value.slice(start, end);
    });

    const nextPage = () => {
        if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const previousPage = () => {
        if (currentPage.value > 1) currentPage.value--;
    };

    const goToPage = (page) => {
        currentPage.value = page;
    };

    // Formater le prix
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR"
        }).format(value);
    };

    // Récupérer les produits lors du montage du composant
    onMounted(fetchProducts);
</script>

<template>
    <div class=" dark:bg-gray-800">
        <!-- Contrôles au-dessus de la table -->
        <div class="flex items-center justify-between mb-4 dark:bg-gray-800">
            <!-- Barre de recherche -->
            <input type="text" v-model="searchTerm" placeholder="Rechercher un produit..."
                class="w-1/3 px-4 py-2 border dark:bg-gray-800  dark:text-white border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300" />

            <!-- Sélecteur pour les entrées par page -->
            <div class="flex items-center">
                <select id="entries" v-model="rowsPerPage"
                    class="px-4 py-2 border dark:bg-gray-800 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                </select>
            </div>
        </div>

        <!-- Tableau -->
        <div v-if="loading" class="text-center dark:text-white text-gray-500">Chargement des données...</div>
        <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
            <table class="min-w-full divide-y dark:bg-gray-800 divide-gray-200">
                <!-- En-tête -->
                <thead class="bg-black dark:bg-gray-500 text-center">
                    <tr>
                        <th @click="sortTable('ProductName')"
                            class="px-6 py-4  dark:text-white text-s font-medium text-gray-100 uppercase cursor-pointer">
                            Product Name
                            <span v-if="sortColumn === 'ProductName'"
                                class="ml-2">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                        </th>
                        <th @click="sortTable('Category')"
                            class="px-6 py-4  dark:text-white text-s font-medium text-gray-100 uppercase cursor-pointer">
                            Category
                            <span v-if="sortColumn === 'Category'"
                                class="ml-2">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                        </th>
                        <th @click="sortTable('Price')"
                            class="px-6 py-4  dark:text-white text-s font-medium text-gray-100 uppercase cursor-pointer">
                            Price
                            <span v-if="sortColumn === 'Price'"
                                class="ml-2">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                        </th>
                        <th @click="sortTable('totalSales')"
                            class="px-6 py-4  dark:text-white text-s font-medium text-gray-100 uppercase cursor-pointer">
                            Total Sales
                            <span v-if="sortColumn === 'totalSales'"
                                class="ml-2">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                        </th>
                    </tr>
                </thead>
                <!-- Corps du tableau -->
                <tbody class="divide-y dark:bg-gray-800  divide-gray-200">
                    <tr v-for="product in paginatedProducts" :key="product.ProductName"
                        class="hover:bg-gray-50 dark:hover:bg-gray-800 ">
                        <td class="px-6 py-4 text-sm dark:text-white text-center  text-gray-900">
                            {{ product . ProductName }}</td>
                        <td class="px-6 py-4 text-sm dark:text-white text-center  text-gray-500">{{ product . Category }}
                        </td>
                        <td class="px-6 py-4 text-sm  dark:text-white text-center  text-gray-500">
                            {{ formatCurrency(product . Price) }}</td>
                        <td class="px-6 py-4 text-sm dark:text-white text-center  text-gray-500">
                            {{ product . totalSales }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Pagination centrée -->
        <div class="flex justify-center mt-4">
            <nav aria-label="Page navigation   dark:text-white example">
                <ul class="flex items-center -space-x-px h-8 text-sm">
                    <li>
                        <a href="#" @click.prevent="previousPage" :disabled="currentPage === 1"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </a>
                    </li>

                    <li v-for="page in totalPages" :key="page"
                        :class="{ 'bg-blue-50': currentPage === page }">
                        <a href="#" @click.prevent="goToPage(page)"
                            :class="{
                                'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': currentPage !==
                                    page,
                                'z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': currentPage ===
                                    page
                            }">
                            {{ page }}
                        </a>
                    </li>

                    <li>
                        <a href="#" @click.prevent="nextPage" :disabled="currentPage === totalPages"
                            class="flex items-center  justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Next</span>
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>


