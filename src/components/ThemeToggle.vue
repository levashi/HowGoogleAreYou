<template>
  <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'">
    <SunIcon v-if="isDark" class="icon" />
    <MoonIcon v-else class="icon" />
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';

const isDark = ref(true);

onMounted(() => {
  const savedTheme = localStorage.getItem('dda_theme');
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  applyTheme();
  localStorage.setItem('dda_theme', isDark.value ? 'dark' : 'light');
};

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
};
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
}
.theme-toggle:hover {
  background: var(--bg-glass-hover);
  transform: scale(1.1);
}
.icon {
  width: 24px;
  height: 24px;
}
@media (max-width: 600px) {
  .theme-toggle { top: 20px; right: 15px; width: 40px; height: 40px; }
  .icon { width: 20px; height: 20px; }
}

@media (max-width: 1000px) and (min-width: 600px) {
  .theme-toggle { top: 60px}
}
</style>