<template>
  <div class="number-container">
    <div class="input-wrapper">
      <input 
        type="number" 
        v-model.number="value" 
        :min="question.min" 
        :max="question.max"
        @keydown.enter="submit"
        ref="inputRef"
      >
      <span v-if="question.unit" class="unit">{{ question.unit }}</span>
    </div>
    <button class="confirm-btn" @click="submit" :disabled="value === null || value === ''">Continuer</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps(['question']);
const emit = defineEmits(['answer']);

const value = ref(null);
const inputRef = ref(null);

onMounted(() => { inputRef.value.focus(); });

const submit = () => {
  if (value.value !== null && value.value !== '') {
    emit('answer', value.value);
  }
};
</script>

<style scoped>
.number-container { display: flex; flex-direction: column; gap: 24px; align-items: flex-start; }
.input-wrapper { display: flex; align-items: baseline; gap: 12px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 8px;}
input {
  background: transparent; border: none; color: white;
  font-size: 2rem; width: 100px; outline: none; text-align: center;
}
.unit { color: rgba(255,255,255,0.6); font-size: 1.2rem; }
.confirm-btn {
  background: white; color: black; padding: 12px 24px; border-radius: 4px;
  font-weight: bold; border: none; cursor: pointer; font-size: 1rem;
}
.confirm-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>