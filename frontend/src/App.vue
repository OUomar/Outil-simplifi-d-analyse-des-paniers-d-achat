<template>
    <div :class="['flex h-screen', darkClass]">
        <!-- Sidebar -->
        <Sidebar v-if="sidebarOpen" class="hidden md:block" />

        <!-- Contenu principal -->
        <div class="flex-1 flex flex-col">
            <Navbar @toggleSidebar="sidebarOpen = !sidebarOpen" @toggleDarkMode="toggleDarkMode" />
            <main class="p-4 flex-1 overflow-y-auto">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script lang="ts">
    import Sidebar from "@/components/Sidebar.vue";
    import Navbar from "@/components/Navbar.vue";
    import {useDark} from '@vueuse/core'
    import {computed} from 'vue';

    export default {
        name: "App",
        components: {
            Sidebar,
            Navbar
        },
        data() {
            return {
                sidebarOpen: true,
            };
        },
        setup() {
            const isDark = useDark();
            const darkClass = computed(() => (isDark.value ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'));

            const toggleDarkMode = () => {
                isDark.value = !isDark.value;
            };

            return {
                darkClass,
                toggleDarkMode,
            };
        },
    };
</script>

<style scoped>
    html {
        transition: background-color 0.3s ease, color 0.3s ease;
    }
</style>
