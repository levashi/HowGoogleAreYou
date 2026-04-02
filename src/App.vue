<template>
  <div class="app-container">
    <!-- Fond du header mobile, visible uniquement au scroll -->
    <div v-if="store.phase === 'quiz'" class="mobile-header-bg" :class="{ 'is-scrolled': isScrolled }"></div>

    <ThemeToggle />
    <VulnerabilityBar v-if="store.phase === 'quiz'" />

    <transition :name="transitionName" mode="out-in">
      
      <!-- INTRO -->
      <div v-if="store.phase === 'intro'" class="intro-screen" key="intro">
        <h1>How Google Are You?</h1>
        <p>Tu te pense probablement en securité derriere ton ecran... à moins que Google n'ai la capacitée de ruiner ta vie?</p>
        <button class="start-btn" @click="store.startQuiz">Démarrer l'audit</button>
      </div>

      <!-- QUIZ -->
      <QuestionCard 
        v-else-if="store.phase === 'quiz' && store.currentQuestion" 
        :question="store.currentQuestion" 
        key="quiz" 
      />

      <!-- LOADING ANALYSE -->
      <LoadingScreen v-else-if="store.phase === 'analyzing'" key="analyzing" />

      <!-- RESULT -->
      <ResultScreen v-else-if="store.phase === 'result'" key="result" />
      
    </transition>

    <Mascot v-if="store.phase === 'intro' || store.phase === 'quiz'" :message="store.mascotMessage" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, onUnmounted } from 'vue';
import { useQuizStore } from './stores/quiz';
import ThemeToggle from './components/ThemeToggle.vue';
import VulnerabilityBar from './components/VulnerabilityBar.vue';
import QuestionCard from './components/QuestionCard.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import ResultScreen from './components/ResultScreen.vue';
import Mascot from './components/Mascot.vue';

const store = useQuizStore();
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  store.loadState();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const transitionName = computed(() => {
  if (store.phase !== 'quiz') return 'fade';
  return store.navDirection === 'forward' ? 'slide-left' : 'slide-right';
});
</script>

<style>
/* --- VARIABLES CSS (Thème Système) --- */
:root {
  --bg-color: #121212;
  --text-color: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
  --bg-glass: rgba(255, 255, 255, 0.05);
  --bg-glass-hover: rgba(255, 255, 255, 0.15);
  --bg-solid: #ffffff;
  --text-inverse: #121212;
  --mascot-bg: #2a2a2a;
  --script-bg: rgba(0, 0, 0, 0.3);
  --shadow-color: rgba(0, 0, 0, 0.4);
  
  --danger-color: #f44336;
  --warning-color: #ff9800;
  --alert-color: #ffeb3b;
  --safe-color: #4caf50;
}

[data-theme="light"] {
  --bg-color: #f9fafb;
  --text-color: #111827;
  --text-muted: rgba(17, 24, 39, 0.6);
  --border-color: rgba(17, 24, 39, 0.15);
  --bg-glass: rgba(17, 24, 39, 0.05);
  --bg-glass-hover: rgba(17, 24, 39, 0.1);
  --bg-solid: #111827;
  --text-inverse: #ffffff;
  --mascot-bg: #e5e7eb;
  --script-bg: rgba(0, 0, 0, 0.05);
  --shadow-color: rgba(0, 0, 0, 0.1);
}

/* Global CSS avec Reset Responsive */
* {
  box-sizing: border-box;
}

body {
  margin: 0; padding: 0; background-color: var(--bg-color); color: var(--text-color);
  font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;
  overflow-x: hidden; 
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-container { 
  min-height: 100vh; position: relative; 
  display: flex; flex-direction: column;
}

/* Header Background (Mobile Only) */
.mobile-header-bg {
  display: none;
}

@media (max-width: 600px) {
  .mobile-header-bg {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 110px; /* Adapte la hauteur pour englober la VulnerabilityBar et les boutons top */
    background: var(--bg-color);
    z-index: 40; /* Juste en dessous des éléments fixes (50, 100, 1000) mais au-dessus du texte */
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, box-shadow 0.3s ease;
  }
  
  .mobile-header-bg.is-scrolled {
    opacity: 0.96;
    box-shadow: 0 4px 20px var(--shadow-color);
  }
}

/* Animations */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from { opacity: 0; transform: translateY(10px); }
.fade-leave-to { opacity: 0; transform: translateY(-10px); }

.slide-left-enter-active, .slide-left-leave-active { transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
.slide-left-enter-from { opacity: 0; transform: translateX(100px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-100px); }

.slide-right-enter-active, .slide-right-leave-active { transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
.slide-right-enter-from { opacity: 0; transform: translateX(-100px); }
.slide-right-leave-to { opacity: 0; transform: translateX(100px); }

/* Intro Screen */
.intro-screen {
  width: 100%; max-width: 600px; margin: 0 auto; flex: 1; display: flex;
  flex-direction: column; justify-content: center; align-items: center;
  text-align: center; padding: 40px 20px;
}
.intro-screen h1 { 
  font-size: clamp(2rem, 6vw, 3rem); 
  line-height: 1.2; margin-bottom: 20px; 
}
.intro-screen p { 
  font-size: clamp(1rem, 3vw, 1.2rem); 
  color: var(--text-muted); margin-bottom: 40px; 
}
.start-btn {
  background: var(--bg-solid); color: var(--text-inverse); font-size: 1.2rem; font-weight: 600;
  padding: 16px 32px; border: none; border-radius: 8px; cursor: pointer; transition: transform 0.2s ease;
  width: 100%; max-width: 300px;
}
.start-btn:hover { transform: scale(1.05); }
</style>