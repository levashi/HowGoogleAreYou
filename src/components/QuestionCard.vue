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
import Binary from './question-types/Binary.vue';
import NumberInput from './question-types/NumberInput.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

const store = useQuizStore();
const props = defineProps(['question']);

const getComponentForType = (type) => {
  const map = {
    'single': SingleChoice,
    'multi': MultiChoice,
    'binary': Binary,
    'number': NumberInput
  };
  return map[type] || SingleChoice;
};
</script>

<style scoped>
.question-wrapper { 
  position: relative;
  width: 100%; max-width: 800px; margin: 0 auto; flex: 1;
  display: flex; flex-direction: column; justify-content: center; 
  padding: 100px 20px 60px;
}
.back-btn {
  position: absolute; 
  top: 30px;
  left: 20px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  z-index: 50;
  padding: 10px;
}

.back-btn:hover { color: var(--text-color); }
.back-icon { width: 30px; height: 30px; }

.question-text { 
  font-size: clamp(1.4rem, 5vw, 2.2rem); 
  font-weight: 600; line-height: 1.35; margin-bottom: 40px; color: var(--text-color); 
}
.input-area { width: 100%; max-width: 600px}

@media (min-width: 800px) {
  .back-btn { top: 80px; left: 0px; }
}
@media (max-width: 600px) {
  .back-btn { position: fixed; top: 15px}
}
@media (max-height: 800px) {
  .question-text { font-size: 17px }
}
</style>