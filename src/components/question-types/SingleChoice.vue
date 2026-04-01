<template>
  <div class="options-list">
    <button 
      v-for="option in question.options" 
      :key="option"
      class="option-btn"
      @click="$emit('answer', option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<script setup>
defineProps(['question']);
defineEmits(['answer']);
</script>

<style scoped>
.options-list { display: flex; flex-direction: column; gap: 12px; }
.option-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  text-align: left;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.option-btn:hover { background: rgba(255,255,255,0.15); transform: translateY(-2px); }
</style>