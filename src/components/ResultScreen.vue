<template>
  <div class="result-wrapper">
    
    <div class="mascot-announcement">
      <div class="mascot-avatar-big">🤖</div>
      <div class="header">
        <p class="subtitle">Mon verdict sur ta vulnérabilité est de...</p>
        <h1 class="score-title" :class="store.profile">{{ store.scoreNormalized }}%</h1>
      </div>
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
  max-width: 800px; margin: 0 auto; padding: 60px 20px;
}
.mascot-announcement {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
}
.mascot-avatar-big {
  font-size: 5rem;
  background: #2a2a2a;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.header { text-align: left; }
.score-title { font-size: 5rem; font-weight: 800; margin: 0; line-height: 1; }
.subtitle { color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; font-weight: 600;}

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

@media (max-width: 600px) {
  .mascot-announcement { flex-direction: column; text-align: center; gap: 15px; }
  .header { text-align: center; }
  .mascot-avatar-big { width: 90px; height: 90px; font-size: 4rem; }
}
</style>