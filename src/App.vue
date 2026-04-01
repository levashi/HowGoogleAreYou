<template>
  <div class="app-container">
    <VulnerabilityBar v-if="store.phase === 'quiz'" />

    <!-- Le composant Transition utilise un nom dynamique pour glisser vers la droite ou la gauche -->
    <transition :name="transitionName" mode="out-in">
      
      <!-- INTRO -->
      <div v-if="store.phase === 'intro'" class="intro-screen" key="intro">
        <h1>Et si ton service principal disparaissait demain ?</h1>
        <p>Ce n'est pas une question théorique. C'est l'audit de ta dépendance numérique.</p>
        <button class="start-btn" @click="store.startQuiz">Démarrer l'audit</button>
      </div>

      <!-- QUIZ -->
      <QuestionCard 
        v-else-if="store.phase === 'quiz' && store.currentQuestion" 
        :question="store.currentQuestion" 
        key="quiz" 
      />

      <!-- RESULT -->
      <ResultScreen v-else-if="store.phase === 'result'" key="result" />
      
    </transition>

    <Mascot v-if="store.phase !== 'result'" :message="store.mascotMessage" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useQuizStore } from './stores/quiz';
import VulnerabilityBar from './components/VulnerabilityBar.vue';
import QuestionCard from './components/QuestionCard.vue';
import ResultScreen from './components/ResultScreen.vue';
import Mascot from './components/Mascot.vue';

const store = useQuizStore();

// Restauration du localStorage au montage
onMounted(() => {
  store.loadState();
});

// Choix de l'animation de glissement
const transitionName = computed(() => {
  if (store.phase !== 'quiz') return 'fade';
  return store.navDirection === 'forward' ? 'slide-left' : 'slide-right';
});
</script>

<style>
/* Global CSS */
body {
  margin: 0; padding: 0; background-color: #121212; color: #ffffff;
  font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;
  overflow-x: hidden; /* Important pour les slides */
}

.app-container { min-height: 100vh; position: relative; }

/* --- Fade (Intro / Result) --- */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from { opacity: 0; transform: translateY(10px); }
.fade-leave-to { opacity: 0; transform: translateY(-10px); }

/* --- Slide vers la Gauche (Suivant) --- */
.slide-left-enter-active, .slide-left-leave-active { transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
.slide-left-enter-from { opacity: 0; transform: translateX(100px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-100px); }

/* --- Slide vers la Droite (Précédent) --- */
.slide-right-enter-active, .slide-right-leave-active { transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
.slide-right-enter-from { opacity: 0; transform: translateX(-100px); }
.slide-right-leave-to { opacity: 0; transform: translateX(100px); }

/* Intro Screen */
.intro-screen {
  max-width: 600px; margin: 0 auto; min-height: 100vh; display: flex;
  flex-direction: column; justify-content: center; align-items: center;
  text-align: center; padding: 20px;
}
.intro-screen h1 { font-size: 2.5rem; line-height: 1.2; margin-bottom: 20px; }
.intro-screen p { font-size: 1.2rem; color: rgba(255, 255, 255, 0.7); margin-bottom: 40px; }
.start-btn {
  background: white; color: #121212; font-size: 1.2rem; font-weight: 600;
  padding: 16px 32px; border: none; border-radius: 8px; cursor: pointer; transition: transform 0.2s ease;
}
.start-btn:hover { transform: scale(1.05); }
</style>