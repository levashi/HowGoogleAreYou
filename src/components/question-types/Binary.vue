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
.binary-list { display: flex; gap: 16px; }
.binary-btn {
  flex: 1;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.binary-btn:hover { background: rgba(255,255,255,0.15); transform: scale(1.02); }
</style>