<template>
  <div class="scale-container">
    <div class="scale-buttons">
      <button 
        v-for="n in (question.max - question.min + 1)" 
        :key="n"
        class="scale-btn"
        @click="$emit('answer', n + question.min - 1)"
      >
        {{ n + question.min - 1 }}
      </button>
    </div>
    <div class="scale-labels">
      <span>{{ question.labels.min }}</span>
      <span>{{ question.labels.max }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps(['question']);
defineEmits(['answer']);
</script>

<style scoped>
.scale-container { display: flex; flex-direction: column; gap: 16px; }
.scale-buttons { display: flex; gap: 12px; justify-content: space-between; }
.scale-btn {
  flex: 1;
  aspect-ratio: 1;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.scale-btn:hover { background: rgba(255,255,255,0.2); }
.scale-labels { display: flex; justify-content: space-between; color: rgba(255,255,255,0.5); font-size: 0.9rem; }
</style>