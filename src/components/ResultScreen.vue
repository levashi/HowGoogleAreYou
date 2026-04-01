<template>
  <div class="result-wrapper">
    
    <div class="mascot-announcement">
      <div class="mascot-avatar-big">🤖</div>
      <div class="header">
        <p class="subtitle">Mon verdict sur ta vulnérabilité est de...</p>
        <!-- On garde le % ici vu que c'est la page finale de bilan -->
        <h1 class="score-title" :class="store.profile">{{ store.scoreNormalized }}%</h1>
      </div>
    </div>

    <!-- Script narratif de l'audit -->
    <ScriptDisplay :script="store.renderedScript" />

    <!-- Conseils actionnables -->
    <div class="advices-section" v-if="store.actionableAdvices.length > 0">
      <h3 class="advices-title">Ta To-Do List de Survie :</h3>
      <div class="advice-card" v-for="adv in store.actionableAdvices" :key="adv.id">
        <h4>{{ adv.title }}</h4>
        <p>{{ adv.text }}</p>
      </div>
    </div>

    <div class="actions">
      <button class="reset-btn" @click="store.reset">Recommencer l'audit</button>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from '../stores/quiz';
import ScriptDisplay from './ScriptDisplay.vue';

const store = useQuizStore();
</script>

<style scoped>
.result-wrapper { 
  max-width: 800px; margin: 0 auto; padding: 60px 20px;
}
.mascot-announcement {
  display: flex; align-items: center; justify-content: center;
  gap: 30px; margin-bottom: 40px;
}
.mascot-avatar-big {
  font-size: 5rem; background: #2a2a2a; width: 120px; height: 120px; display: flex;
  justify-content: center; align-items: center; border-radius: 50%;
  border: 4px solid #fff; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.header { text-align: left; }
.score-title { font-size: 5rem; font-weight: 800; margin: 0; line-height: 1; }
.subtitle { color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; font-weight: 600;}

.resilient { color: #4caf50; }
.fragile { color: #ffeb3b; }
.exposed { color: #ff9800; }
.critical { color: #f44336; }

/* Section des conseils */
.advices-section {
  margin-top: 50px;
  animation: fadeIn 1s 1.5s forwards; /* Apparaît doucement après le script */
  opacity: 0;
}
.advices-title { color: #fff; font-size: 1.5rem; margin-bottom: 20px; }
.advice-card {
  background: rgba(255,255,255,0.05); border-left: 4px solid #ff9800;
  padding: 20px; border-radius: 4px; margin-bottom: 15px;
}
.advice-card h4 { margin: 0 0 10px 0; font-size: 1.1rem; color: #fff; }
.advice-card p { margin: 0; color: rgba(255,255,255,0.7); line-height: 1.5; font-size: 0.95rem;}

.actions { margin-top: 50px; text-align: center; }
.reset-btn { 
  background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white;
  padding: 12px 24px; border-radius: 8px; cursor: pointer; transition: 0.2s;
}
.reset-btn:hover { background: rgba(255,255,255,0.1); }

@keyframes fadeIn { to { opacity: 1; } }

@media (max-width: 600px) {
  .mascot-announcement { flex-direction: column; text-align: center; gap: 15px; }
  .header { text-align: center; }
  .mascot-avatar-big { width: 90px; height: 90px; font-size: 4rem; }
}
</style>