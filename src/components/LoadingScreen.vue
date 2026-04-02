<template>
  <div class="loading-wrapper">
    <div class="mascot-center pulse">🤖</div>
    <h2 class="loading-text">{{ text }}</h2>
    <div class="spinner-bar">
      <div class="spinner-fill"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuizStore } from '../stores/quiz';

const store = useQuizStore();
const text = ref("Extraction de ton empreinte cloud...");

onMounted(() => {
  setTimeout(() => text.value = "Analyse des maillons faibles...", 1200);
  setTimeout(() => text.value = "Calcul des points de rupture...", 2400);
  
  setTimeout(() => {
    store.showResults();
  }, 3500);
});
</script>

<style scoped>
.loading-wrapper {
  width: 100%; max-width: 600px; margin: 0 auto; flex: 1;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  text-align: center; padding: 20px; min-height: 100vh;
}
.mascot-center {
  font-size: 5rem;
  background: var(--mascot-bg);
  width: 120px; height: 120px;
  display: flex; justify-content: center; align-items: center;
  border-radius: 50%; border: 4px solid var(--text-color);
  box-shadow: 0 8px 24px var(--shadow-color);
  margin-bottom: 30px;
}
.pulse {
  animation: pulse 1.5s infinite ease-in-out;
}
.loading-text {
  font-size: 1.2rem; font-weight: 500; color: var(--text-color);
  margin-bottom: 30px; min-height: 1.5em;
}
.spinner-bar {
  width: 200px; height: 4px; background: var(--bg-glass);
  border-radius: 2px; overflow: hidden; position: relative;
}
.spinner-fill {
  position: absolute; top: 0; left: 0; height: 100%; width: 40%;
  background: var(--text-color); border-radius: 2px;
  animation: slide 1s infinite alternate ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255, 152, 0, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 152, 0, 0); }
}
@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(150px); }
}
</style>