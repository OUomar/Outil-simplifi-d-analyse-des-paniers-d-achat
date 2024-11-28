
<script lang="ts">
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-3 w-full transition-transform duration-300 ease-in-out dark:bg-gray-800 my-4">
    <div class="border-b-4 my-4 dark:border-b-gray-600">
      <h3 class="text-xl font-bold text-gray-800 text-center mb-6 hover:text-teal-600 transition-colors duration-300 dark:text-white">
        {{ title }}
      </h3>
    </div>
    <slot />
  </div>
</template>

/* Ajoutez ici des styles spécifiques au composant, si nécessaire */
<style scoped>

</style>
