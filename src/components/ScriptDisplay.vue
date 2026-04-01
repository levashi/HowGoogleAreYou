<template>
  <div class="script-box">
    <div class="typewriter-content" v-html="displayedText"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps(['script']);
const displayedText = ref('');

onMounted(() => {
  // Effet typewriter simple
  const chars = props.script.split('');
  let i = 0;
  
  const interval = setInterval(() => {
    if (i < chars.length) {
      // Gère les sauts de ligne correctement avec HTML
      displayedText.value += chars[i] === '\n' ? '<br>' : chars[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 20); // Vitesse
});
</script>

<style scoped>
.script-box {
  background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
  padding: 30px; border-radius: 12px; margin-top: 30px;
  font-family: 'Courier New', Courier, monospace; line-height: 1.6;
  font-size: 1.1rem; color: #e0e0e0;
}
</style>