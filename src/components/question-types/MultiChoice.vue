<template>
  <div class="multi-container">
    <div class="options-list">
      <label 
        v-for="option in question.options" 
        :key="option"
        class="multi-option"
        :class="{ selected: selected.includes(option) }"
      >
        <input type="checkbox" :value="option" v-model="selected">
        <span class="checkbox-custom"></span>
        {{ option }}
      </label>
    </div>
    <button class="confirm-btn" @click="$emit('answer', selected)">Continuer</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['question']);
defineEmits(['answer']);

const selected = ref([]);
</script>

<style scoped>
.multi-container { display: flex; flex-direction: column; gap: 24px; }
.options-list { display: flex; flex-direction: column; gap: 12px; }
.multi-option {
  display: flex; align-items: center; gap: 16px;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  padding: 16px 20px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
  color: white; font-size: 1.1rem;
}
.multi-option:hover { background: rgba(255,255,255,0.1); }
.multi-option.selected { border-color: white; background: rgba(255,255,255,0.15); }
input[type="checkbox"] { display: none; }
.checkbox-custom {
  width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.5); border-radius: 4px;
}
.multi-option.selected .checkbox-custom { background: white; border-color: white; }
.confirm-btn {
  align-self: flex-start; background: white; color: black; padding: 12px 24px;
  border-radius: 4px; font-weight: bold; border: none; cursor: pointer; font-size: 1rem;
}
</style>