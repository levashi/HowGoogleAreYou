<template>
  <div class="binary-list">
    <button 
      v-for="option in question.options" 
      :key="option"
      class="option-btn binary-btn"
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
.binary-list { 
  display: flex; 
  gap: 16px; 
  flex-direction: column; 
}
@media (min-width: 600px) {
  .binary-list { flex-direction: row; }
}

.binary-btn {
  flex: 1; background: var(--bg-glass); border: 1px solid var(--border-color);
  color: var(--text-color); padding: 24px; border-radius: 8px;
  text-align: center; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.binary-btn:hover { background: var(--bg-glass-hover); transform: scale(1.02); }
</style>