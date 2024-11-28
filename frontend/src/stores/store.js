// src/store.js
import { reactive } from 'vue';

export const store = reactive({
  isDarkMode: localStorage.getItem('dark-mode') === 'true', // Récupérer la préférence enregistrée dans localStorage
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode; // Bascule entre mode sombre et clair
    localStorage.setItem('dark-mode', this.isDarkMode); // Enregistrer la préférence dans localStorage
  },
});
