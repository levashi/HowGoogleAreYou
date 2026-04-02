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
  background: var(--bg-glass); border: 1px solid var(--border-color);
  padding: 16px 20px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
  color: var(--text-color); font-size: 1.1rem;
}
.multi-option:hover { background: var(--bg-glass-hover); }
.multi-option.selected { border-color: var(--text-color); background: var(--bg-glass-hover); }
input[type="checkbox"] { display: none; }
.checkbox-custom {
  width: 20px; height: 20px; min-width: 20px; max-width: 20px; border: 2px solid var(--text-muted); border-radius: 4px;
}
.multi-option.selected .checkbox-custom { background: var(--text-color); border-color: var(--text-color); }
.confirm-btn {
  align-self: flex-start; background: var(--bg-solid); color: var(--text-inverse); padding: 12px 24px;
  border-radius: 4px; font-weight: bold; border: none; cursor: pointer; font-size: 1rem;
}
@media (max-height: 800px){
  .multi-option {padding: 10px 20px; font-size: 15px;}
}
@media (max-height: 900px){
  .confirm-btn { margin-bottom: 100px;}
}
</style>