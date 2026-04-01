<template>
  <div class="script-box">
    <div class="typewriter-content">
      <div v-for="(block, index) in displayedBlocks" :key="index" class="narrative-block">
        <span class="timestamp">[{{ block.time }}]</span>
        <span class="text" v-html="block.text"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['blocks']);
const displayedBlocks = ref([]);

onMounted(() => {
  let blockIndex = 0;

  const showNextBlock = () => {
    if (blockIndex < props.blocks.length) {
      const currentBlock = props.blocks[blockIndex];
      // On crée la structure vide pour ce bloc
      const currentDisplayedBlock = { time: currentBlock.time, text: '' };
      displayedBlocks.value.push(currentDisplayedBlock);
      
      const textToType = currentBlock.text;
      let charIndex = 0;
      
      const typeChar = () => {
        if (charIndex < textToType.length) {
          displayedBlocks.value[blockIndex].text += textToType[charIndex] === '\n' ? '<br>' : textToType[charIndex];
          charIndex++;
          setTimeout(typeChar, 15); // Vitesse de frappe par caractère
        } else {
          blockIndex++;
          setTimeout(showNextBlock, 600); // Pause avant d'afficher le bloc suivant
        }
      };
      
      typeChar();
    }
  };

  showNextBlock();
});
</script>

<style scoped>
.script-box {
  background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
  padding: 30px; border-radius: 12px; margin-top: 30px;
  font-family: 'Courier New', Courier, monospace; line-height: 1.6;
  font-size: 1.1rem; color: #e0e0e0;
}
.narrative-block {
  margin-bottom: 20px;
}
.timestamp {
  color: #ff9800;
  font-weight: bold;
  margin-right: 12px;
}
</style>