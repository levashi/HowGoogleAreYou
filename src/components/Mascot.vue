<template>
  <div class="mascot-container">
    <div v-if="message" class="speech-bubble" :key="message">
      {{ message }}
    </div>
    <div class="mascot-avatar">
      🤖
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.mascot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: flex-end;
  gap: 15px;
  z-index: 1000;
  pointer-events: none;
}

.speech-bubble {
  background: var(--bg-solid);
  color: var(--text-inverse);
  padding: 15px 20px;
  border-radius: 20px 20px 0 20px;
  font-weight: 600;
  font-size: 0.95rem;
  max-width: 250px;
  box-shadow: 0 8px 24px var(--shadow-color);
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  pointer-events: auto;
}

.mascot-avatar {
  font-size: 3rem;
  background: var(--mascot-bg);
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 3px solid var(--text-color);
  box-shadow: 0 8px 24px var(--shadow-color);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.8) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@media (max-width: 600px) {
  .mascot-container { bottom: 15px; right: 15px; }
  .mascot-avatar { width: 50px; height: 50px; font-size: 2rem; }
  .speech-bubble { font-size: 0.85rem; padding: 10px 15px; }
}
</style>