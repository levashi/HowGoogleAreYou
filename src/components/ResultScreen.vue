<template>
  <div class="result-wrapper">
    
    <div class="export-container" id="exportable-card">
      <div class="mascot-announcement">
        <div class="mascot-avatar-big">🤖</div>
        <div class="header">
          <p class="subtitle">Mon verdict sur ta vulnérabilité :</p>
          <h1 class="score-title" :class="store.profile">
            {{ store.rupturePointsCount }} point{{ store.rupturePointsCount > 1 ? 's' : '' }} de rupture
          </h1>
          <p class="subtitle-small" v-if="store.rupturePointsCount >= 4">Ton écosystème numérique est un château de cartes.</p>
          <p class="subtitle-small" v-else-if="store.rupturePointsCount > 0">Certains maillons vitaux sont exposés.</p>
          <p class="subtitle-small" v-else>Profil résilient. Tu as compartimenté tes accès.</p>
        </div>
      </div>
      
      <!-- Uniquement visible lors de l'export -->
      <div id="export-only-details" style="display: none;">
        <ul class="export-damages" v-if="store.rupturePointsCount > 0">
          <li v-if="store.profileVars.is_google_email || store.profileVars.is_apple_email">Impossible de récupérer les accès principaux</li>
          <li v-if="store.profileVars.bad_pw">Perte de tous les mots de passe</li>
          <li v-if="store.profileVars.no_local_backup">Destruction du patrimoine numérique sans retour possible</li>
          <li v-if="store.profileVars.is_pro_finance">Coupure des accès et vérifications bancaires</li>
          <li v-if="store.profileVars.is_sso_addict">Déconnexion simultanée de toutes les applications tierces</li>
        </ul>
        <div class="export-footer">
          Fais l'audit de ta dépendance sur : <strong>https://digital-dependency-audit.web.app</strong>
        </div>
      </div>
    </div>

    <!-- Script narratif de l'audit -->
    <ScriptDisplay :blocks="store.activeScenarioBlocks" />

    <!-- Conseils actionnables -->
    <div class="advices-section" v-if="store.actionableAdvices.length > 0">
      <h3 class="advices-title">Ta To-Do List de Survie :</h3>
      <div class="advice-card" v-for="adv in store.actionableAdvices" :key="adv.id">
        <h4>{{ adv.title }}</h4>
        <p>{{ adv.text }}</p>
      </div>
    </div>

    <div class="actions">
      <button class="export-btn" @click="exportCard">Partager mon résultat</button>
      <button class="reset-btn" @click="store.reset">Recommencer l'audit</button>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from '../stores/quiz';
import ScriptDisplay from './ScriptDisplay.vue';
import html2canvas from 'html2canvas';

const store = useQuizStore();

const exportCard = async () => {
  const container = document.getElementById('exportable-card');
  const details = document.getElementById('export-only-details');
  
  if (!container || !details) return;
  
  container.classList.add('exporting');
  details.style.display = 'block';
  
  // Laisser le temps au DOM de se mettre à jour
  await new Promise(r => setTimeout(r, 100));

  try {
    const canvas = await html2canvas(container, {
      backgroundColor: '#121212',
      scale: 2,
    });
    
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'digital-dependency-audit.png';
    link.click();
  } catch (err) {
    console.error("Erreur lors de l'export :", err);
  } finally {
    container.classList.remove('exporting');
    details.style.display = 'none';
  }
};
</script>

<style scoped>
.result-wrapper { 
  max-width: 800px; margin: 0 auto; padding: 60px 20px;
}
.export-container {
  padding: 20px;
  border-radius: 16px;
  background: transparent;
  margin-bottom: 40px;
}
.export-container.exporting {
  background: #121212; 
}
.mascot-announcement {
  display: flex; align-items: center; justify-content: center;
  gap: 30px; 
}
.mascot-avatar-big {
  font-size: 5rem; background: #2a2a2a; width: 120px; height: 120px; display: flex;
  justify-content: center; align-items: center; border-radius: 50%;
  border: 4px solid #fff; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  flex-shrink: 0;
}
.header { text-align: left; }
.score-title { font-size: 4rem; font-weight: 800; margin: 0; line-height: 1.1; }
.subtitle { color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; font-weight: 600;}
.subtitle-small { color: rgba(255,255,255,0.7); font-size: 1.1rem; margin-top: 10px; }

.export-damages {
  margin: 30px 0; padding-left: 20px; color: #ff9800; font-size: 1.1rem; line-height: 1.6;
}
.export-damages li { margin-bottom: 8px; }
.export-footer {
  margin-top: 20px; font-size: 1rem; color: rgba(255,255,255,0.5); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;
}

.resilient { color: #4caf50; }
.fragile { color: #ffeb3b; }
.exposed { color: #ff9800; }
.critical { color: #f44336; }

/* Section des conseils */
.advices-section {
  margin-top: 50px;
  animation: fadeIn 1s 1.5s forwards;
  opacity: 0;
}
.advices-title { color: #fff; font-size: 1.5rem; margin-bottom: 20px; }
.advice-card {
  background: rgba(255,255,255,0.05); border-left: 4px solid #ff9800;
  padding: 20px; border-radius: 4px; margin-bottom: 15px;
}
.advice-card h4 { margin: 0 0 10px 0; font-size: 1.1rem; color: #fff; }
.advice-card p { margin: 0; color: rgba(255,255,255,0.7); line-height: 1.5; font-size: 0.95rem;}

.actions { margin-top: 50px; text-align: center; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;}
.export-btn { 
  background: white; color: black; font-weight: bold; border: none;
  padding: 12px 24px; border-radius: 8px; cursor: pointer; transition: 0.2s; 
}
.export-btn:hover { transform: scale(1.05); }
.reset-btn { 
  background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white;
  padding: 12px 24px; border-radius: 8px; cursor: pointer; transition: 0.2s;
}
.reset-btn:hover { background: rgba(255,255,255,0.1); }

@keyframes fadeIn { to { opacity: 1; } }

@media (max-width: 600px) {
  .mascot-announcement { flex-direction: column; text-align: center; gap: 15px; }
  .header { text-align: center; }
  .mascot-avatar-big { width: 90px; height: 90px; font-size: 4rem; }
  .score-title { font-size: 3rem; }
}
</style>