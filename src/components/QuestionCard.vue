<template>
  <div class="question-wrapper">
    <div class="top-bar">
      <button class="back-btn" @click="store.goBack">← Retour</button>
      <div class="step-indicator">
        Étape {{ store.stepProgress.current }} / {{ store.stepProgress.total }}
      </div>
    </div>
    
    <div class="question-content">
      <h2 class="question-text">{{ question.text }}</h2>
      
      <div class="input-area">
        <!-- Key forcée à id pour re-rendre proprement l'input si on navigue -->
        <component 
          :is="getComponentForType(question.type)" 
          :question="question" 
          @answer="(ans) => store.answerQuestion(ans)" 
          :key="question.id" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from '../stores/quiz';
import SingleChoice from './question-types/SingleChoice.vue';
import MultiChoice from './question-types/MultiChoice.vue';
import Scale from './question-types/Scale.vue';
import Binary from './question-types/Binary.vue';
import NumberInput from './question-types/NumberInput.vue';

const store = useQuizStore();
const props = defineProps(['question']);

const getComponentForType = (type) => {
  const map = {
    'single': SingleChoice,
    'multi': MultiChoice,
    'scale': Scale,
    'binary': Binary,
    'number': NumberInput
  };
  return map[type] || SingleChoice;
};
</script>

<style scoped>
.question-wrapper { 
  max-width: 800px; margin: 0 auto; min-height: 100vh;
  display: flex; flex-direction: column; justify-content: center; padding: 40px 20px;
}
.top-bar {
  position: absolute; top: 60px; left: 0; width: 100%; padding: 0 20px; 
  display: flex; justify-content: space-between; align-items: center; box-sizing: border-box;
}
.back-btn { 
  background: none; border: none; color: rgba(255,255,255,0.5); 
  cursor: pointer; font-size: 1rem; padding: 0;
}
.back-btn:hover { color: white; }
.step-indicator { color: rgba(255,255,255,0.4); font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;}
.question-text { font-size: 2rem; font-weight: 600; line-height: 1.3; margin-bottom: 40px; color: white; }
.input-area { width: 100%; max-width: 600px; }

@media (max-width: 600px) {
  .top-bar { top: 40px; }
}
</style>