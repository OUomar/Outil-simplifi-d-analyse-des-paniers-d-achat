
<script lang="ts">
    import {defineComponent,ref,onMounted
    } from 'vue';
    import {getTrendingProducts} from "@/api/analytics"; 
    import {useDark} from '@vueuse/core'
    import IconPrice from "@/components/icons/IconPrice.vue"
    import IconQte from "@/components/icons/IconQte.vue"
    import IconTotal from "@/components/icons/IconTotal.vue"

    // Gérer l'état du mode sombre
    const isDark = useDark()

    export default defineComponent({
        name: 'TopSellingProducts',
        components:{
            IconPrice,
            IconQte,
            IconTotal,
        },
        setup() {
            const topSellingProducts = ref < any[] > ([]);
            const isLoading = ref < boolean > (true); 

            // Tableau de couleurs d'accentuation
            const colors = ['#36A2EB', '#FF6384', '#FF9F40', '#4BC0C0','#FFCE56'];

            // Fonction pour récupérer les produits les plus vendus
            const fetchTopSellingProducts = async () => {
                try {
                    const products =
                await getTrendingProducts(); // Appel à l'API pour récupérer les produits
                topSellingProducts.value = products;
                } catch (error) {
                    console.error("Erreur lors de la récupération des produits les plus vendus :",
                        error);
                } finally {
                    isLoading.value = false;
                }
            };

            onMounted(() => {
                fetchTopSellingProducts();
            });

            return {
                topSellingProducts,
                isLoading,
                colors,
            };
        },
    });
</script>

<template>
    <div>
        <ul class="dark:bg-gray-800">
            <li v-for="(product, index) in topSellingProducts" :key="product._id"
                :style="{ '--accent-color': colors[index % colors.length] }">
                <div class="name dark:text-white">{{ index + 1 }} - {{ product . ProductName }}</div>

                <div class=" qte flex items-center gap-1">
                    <IconQte/>
                    <!-- Texte "Quantité : " -->
                    <div class="value font-semibold dark:text-white text-gray-800">Quantité vendue :</div>
                    <!-- Valeur dynamique -->
                    <div class="font-medium dark:text-white text-gray-70 bg-green-200 rounded-xl px-2">{{ product . totalQuantity }}</div>
                </div>

                <div class=" prix flex items-center gap-1">
                    <IconPrice/>
                    <!-- Texte "Prix : " -->
                    <div class="value font-semibold dark:text-white text-gray-800">Prix :</div>
                    <!-- Valeur dynamique -->
                    <div class="font-medium dark:text-white text-gray-700">{{ product . Price }}</div>
                </div>

                <div class=" flex items-center gap-1">
                    <IconTotal/>
                    <!-- Texte "Totale des ventes : " -->
                    <div class="value dark:text-white text-gray-800">Total des ventes : </div>
                    <!-- Valeur dynamique -->
                    <div class=" dark:text-white text-gray-70">{{product.totalSales.toFixed(2) }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>

    ul {
        --col-gap: 2rem;
        --row-gap: 2rem;
        --line-w: 0.25rem;
        display: grid;
        grid-template-columns: var(--line-w) 1fr;
        grid-auto-columns: max-content;
        column-gap: var(--col-gap);
        list-style: none;
        width: min(60rem, 100%);
        margin-inline: auto;
    }

    /* line */
    ul::before {
        content: "";
        grid-column: 1;
        grid-row: 1 / span 20;
        background: rgb(225, 225, 225);
        border-radius: calc(var(--line-w) / 2);
    }

    ul li:not(:last-child) {
        margin-bottom: var(--row-gap);
    }

    /* card */
    ul li {
        grid-column: 2;
        --inlineP: 0.5rem;
        margin-inline: var(--inlineP);
        grid-row: span 2;
        display: grid;
        grid-template-rows: min-content min-content min-content;
    }

    /* name */
    ul li .name {
        --nameH: 3rem;
        height: var(--nameH);
        margin-inline: calc(var(--inlineP) * -1);

        text-align: center;
        background-color: var(--accent-color);

        color: white;
        font-size: 1.25rem;
        font-weight: 500;

        display: grid;
        place-content: center;
        position: relative;

        border-radius: calc(var(--nameH) / 2) 0 0 calc(var(--nameH) / 2);
    }

    /* name flap */
    ul li .name::before {
        content: "";
        width: var(--inlineP);
        aspect-ratio: 1;
        background: var(--accent-color);
        background-image: linear-gradient(rgba(0, 0, 0, 0.2) 100%, transparent);
        position: absolute;
        top: 100%;

        clip-path: polygon(0 0, 100% 0, 0 100%);
        right: 0;
    }

    /* circle */
    ul li .name::after {
        content: "";
        position: absolute;
        width: 2rem;
        aspect-ratio: 1;
        background: var(--bgColor);
        border: 0.3rem solid var(--accent-color);
        border-radius: 50%;
        top: 50%;

        transform: translate(50%, -50%);
        right: calc(100% + var(--col-gap) + var(--line-w) / 2);
    }

    ul li .prix {
        overflow: hidden;
        font-weight: 300;
    }
    ul li .qte {
        padding-block-start: 0.5rem;
    }

    ul li .value {
        overflow: hidden;
        padding-block-start: 1.2rem;
        padding-block-end: 1rem;
        font-weight: 500;
        font-size: 15px;
    }

    /* shadows */
    ul li .prix::before,
    ul li .qte_mt::before {
        content: "";
        position: absolute;
        width: 90%;
        height: 0.5rem;
    }

    ul li .prix::before {
        bottom: calc(100% + 0.125rem);
    }

    ul li .qte_mt::before {
        z-index: -1;
        bottom: 0.25rem;
    }

    @media (min-width: 40rem) {
        ul {
            grid-template-columns: 1fr var(--line-w) 1fr;
        }

        ul::before {
            grid-column: 2;
        }

        ul li:nth-child(odd) {
            grid-column: 1;
        }

        ul li:nth-child(even) {
            grid-column: 3;
        }

        /* start second card */
        ul li:nth-child(2) {
            grid-row: 2/4;
        }

        ul li:nth-child(odd) .name::before {
            clip-path: polygon(0 0, 100% 0, 100% 100%);
            left: 0;
        }

        ul li:nth-child(odd) .name::after {
            transform: translate(-50%, -50%);
            left: calc(100% + var(--col-gap) + var(--line-w) / 2);
        }

        ul li:nth-child(odd) .name {
            border-radius: 0 calc(var(--nameH) / 2) calc(var(--nameH) / 2) 0;
        }
    }

    .credits {
        margin-top: 1rem;
        text-align: right;
    }

    .credits a {
        color: var(--color);
    }
</style>
