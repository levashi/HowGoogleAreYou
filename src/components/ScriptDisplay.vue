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
      const currentDisplayedBlock = { time: currentBlock.time, text: '' };
      displayedBlocks.value.push(currentDisplayedBlock);
      
      const textToType = currentBlock.text;
      let charIndex = 0;
      
      const typeChar = () => {
        if (charIndex < textToType.length) {
          displayedBlocks.value[blockIndex].text += textToType[charIndex] === '\n' ? '<br>' : textToType[charIndex];
          charIndex++;
          setTimeout(typeChar, 15);
        } else {
          blockIndex++;
          setTimeout(showNextBlock, 600);
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
  background: var(--script-bg); border: 1px solid var(--border-color);
  padding: 30px; border-radius: 12px; margin-top: 30px;
  font-family: 'Courier New', Courier, monospace; line-height: 1.6;
  font-size: 1.1rem; color: var(--text-color);
}
.narrative-block {
  margin-bottom: 20px;
}
.timestamp {
  color: var(--warning-color);
  font-weight: bold;
  margin-right: 12px;
}
</style>