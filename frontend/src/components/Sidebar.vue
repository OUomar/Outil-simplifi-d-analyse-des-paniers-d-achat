
<script lang="ts">
    import {useDark} from '@vueuse/core'

    // Gérer l'état du mode sombre
    const isDark = useDark()
    export default {
        name: "Sidebar",
        data() {
            return {
                isCollapsed: false,
                menuItems: [{
                        name: "Tableau de bord",
                        link: "/",
                        icon: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                    }, 

                ],
            };
        },
        methods: {
            toggleSidebar() {
                this.isCollapsed = !this.isCollapsed;
            },
            isActive(link: string) {
                return this.$route.path === link;
            },
        },
    };
</script>

<template>
    <div
        :class="[
            'flex flex-col h-screen  dark:bg-gray-800 bg-white text-white transition-all duration-300',
            isCollapsed ? 'w-20' : 'w-64'
        ]">
        <!-- Bouton de Réduction -->
        <div class="p-4 flex items-center justify-between">
            <h2 v-if="!isCollapsed"
                class="text-xl font-extrabold text-center text-indigo-400 tracking-widest  border-b-4 border-indigo-600 transition-all duration-300">
                Analyse des Paniers
            </h2>

            <button @click="toggleSidebar" class=" rounded p-2 hover:text-white hover:bg-gray-700 text-gray-800">
                <!-- Icône de menu -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </div>

        <!-- Menu -->
        <ul class="flex-1">
            <li v-for="item in menuItems" :key="item.name"
                :class="[
                    'flex items-center py-3 px-4 hover:bg-gray-700 hover:text-white text-gray-900 rounded transition-all duration-300 cursor-pointer',
                    isActive(item.link) ? 'bg-gray-600 ' : ''
                ]">
                <!-- Lien de navigation -->
                <router-link :to="item.link" class="w-full flex items-center text-gray-600"
                    exact-active-class="text-white">
                    <span class="mr-4">
                        <!-- Icône dynamique -->
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                        </svg>
                    </span>
                    <span v-if="!isCollapsed">{{ item . name }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>



<style scoped>

</style>
