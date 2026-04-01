<template>
  <div class="question-wrapper">
    <button class="back-btn" @click="store.goBack">
      <ArrowLeftIcon class="back-icon"/>
    </button>
    
    <div class="question-content">
      <h2 class="question-text">{{ question.text }}</h2>
      
      <div class="input-area">
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
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

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
  position: relative;
  max-width: 800px; margin: 0 auto; min-height: 100vh;
  display: flex; flex-direction: column; justify-content: center; padding: 40px 20px;
}
.back-btn {
  position: fixed; 
  top: 80px;
  left: 80px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  z-index: 1000;
}

.back-btn:hover { color: white; }
.back-icon { width: 30px; height: 30px; }

@media (max-width: 600px) {
  .back-btn { top: 15px; left: 15px; }
  .back-icon { width: 24px; height: 24px; }
}

.question-text { font-size: 2rem; font-weight: 600; line-height: 1.3; margin-bottom: 40px; color: white; }
.input-area { width: 100%; max-width: 600px; }
</style>