
<script setup>
    import {ref} from 'vue'
    import {Disclosure,DisclosureButton,DisclosurePanel,Menu,MenuButton,MenuItem,MenuItems} from '@headlessui/vue'
    import {Bars3Icon,BellIcon,XMarkIcon,MoonIcon} from '@heroicons/vue/24/outline'
    import {
        useDark
    } from '@vueuse/core'
    // Gérer l'état du mode sombre
    const isDark = useDark()

    // Fonction pour basculer le mode sombre
    const toggleDarkMode = () => {
        isDark.value = !isDark.value
    }
</script>

<template>
    <Disclosure as="nav" class="bg-white dark:bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>

                <!-- Search Bar -->
                <div class="relative ml-4">
                    <input type="text" placeholder="Search"
                        class="rounded-md border-gray-300 dark:bg-gray-800 focus:border-black focus:ring-1 focus:ring-black py-2 pl-10 pr-4 text-sm" />
                    <span class="absolute left-3 top-2.5 text-gray-500">
                        <!-- Search Icon -->
                        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-4.35-4.35M18.5 10a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                        </svg>
                    </span>
                </div>

                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- Notification Button -->
                    <button type="button"
                        class="relative rounded-full bg-white m-3 p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white">
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">View notifications</span>
                        <BellIcon class="size-6" aria-hidden="true" />
                    </button>

                    <!-- Moon Icon Button for Dark Mode -->
                    <button type="button" @click="toggleDarkMode"
                        class="relative rounded-full bg-white p-1 m-3 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white">
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">Toggle dark mode</span>
                        <MoonIcon class="size-6" :class="{ 'text-gray-500': isDark }" aria-hidden="true" />
                    </button>

                    <!-- Profile Dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <div>
                            <MenuButton
                                class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">Open user menu</span>
                                <img class="size-8 rounded-full"
                                    src="../assets/images/profil.jpg"
                                    alt="User Profile" />
                            </MenuButton>
                        </div>
                        <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <MenuItems
                                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <MenuItem v-slot="{ active }">
                                <a href="#"
                                    :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Your
                                    Profile</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <a href="#"
                                    :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <a href="#"
                                    :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign
                                    out</a>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a"
                    :href="item.href"
                    :class="[item.current ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-100 hover:text-black',
                        'block rounded-md px-3 py-2 text-base font-medium'
                    ]"
                    :aria-current="item.current ? 'page' : undefined">{{ item . name }}</DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>


