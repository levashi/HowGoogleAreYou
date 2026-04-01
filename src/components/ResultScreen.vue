<template>
  <div class="result-wrapper">
    <div class="header">
      <h1 class="score-title" :class="store.profile">{{ store.scoreNormalized }}%</h1>
      <p class="subtitle">Score de Vulnérabilité</p>
    </div>

    <ScriptDisplay :script="store.renderedScript" />

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
  max-width: 800px; margin: 0 auto; padding: 100px 20px 60px;
}
.header { text-align: center; margin-bottom: 40px; }
.score-title { font-size: 5rem; font-weight: 800; margin: 0; line-height: 1; }
.subtitle { color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 2px; margin-top: 10px; }

/* Couleurs des profils */
.resilient { color: #4caf50; }
.fragile { color: #ffeb3b; }
.exposed { color: #ff9800; }
.critical { color: #f44336; }

.actions { margin-top: 50px; text-align: center; }
.reset-btn { 
  background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white;
  padding: 12px 24px; border-radius: 8px; cursor: pointer; transition: 0.2s;
}
.reset-btn:hover { background: rgba(255,255,255,0.1); }
</style>