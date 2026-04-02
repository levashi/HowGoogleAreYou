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
          <p class="subtitle-small" v-else-if="store.rupturePointsCount > 0">Certains maillons vitaux sont à découvert.</p>
          <p class="subtitle-small" v-else>Profil résilient. Tu as sécurisé tes accès.</p>
        </div>
      </div>
      
      <div id="export-only-details" style="display: none;">
        <ul class="export-damages" v-if="store.rupturePointsCount > 0">
          <li v-if="store.profileVars.is_google_email || store.profileVars.is_apple_email">Impossible de récupérer les accès principaux (Emails)</li>
          <li v-if="store.profileVars.bad_pw">Mots de passe bloqués dans l'écosystème</li>
          <li v-if="store.profileVars.has_critical_data">Destruction des données vitales (Photos, Drive...) sans retour possible</li>
          <li v-if="store.profileVars.is_pro_finance">Coupure des accès et validations bancaires</li>
          <li v-if="store.profileVars.is_sso_addict">Déconnexion simultanée de toutes les apps tierces</li>
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
  
  await new Promise(r => setTimeout(r, 100));

  try {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const canvas = await html2canvas(container, {
      backgroundColor: isLight ? '#f9fafb' : '#121212',
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
  width: 100%; max-width: 800px; margin: 0 auto; padding: 60px 20px;
}
.export-container {
  padding: 20px;
  border-radius: 16px;
  background: transparent;
  margin-bottom: 40px;
}
.export-container.exporting {
  background: var(--bg-color); 
}
.mascot-announcement {
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
  gap: 20px; 
}
.mascot-avatar-big {
  font-size: clamp(3rem, 10vw, 5rem); 
  background: var(--mascot-bg); 
  width: clamp(80px, 20vw, 120px); 
  height: clamp(80px, 20vw, 120px); 
  display: flex; justify-content: center; align-items: center; border-radius: 50%;
  border: 4px solid var(--text-color); box-shadow: 0 8px 24px var(--shadow-color);
  flex-shrink: 0;
}
.header { text-align: center; flex: 1 1 300px; }
@media (min-width: 600px) {
  .header { text-align: left; }
  .mascot-announcement { flex-wrap: nowrap; gap: 30px; }
}

.score-title { font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; margin: 0; line-height: 1.1; }
.subtitle { color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem; margin-bottom: 5px; font-weight: 600;}
.subtitle-small { color: var(--text-muted); font-size: 1.1rem; margin-top: 10px; }

.export-damages {
  margin: 30px 0; padding-left: 20px; color: var(--warning-color); font-size: 1rem; line-height: 1.5;
}
.export-damages li { margin-bottom: 8px; }
.export-footer {
  margin-top: 20px; font-size: 0.9rem; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: 15px;
}

.resilient { color: var(--safe-color); }
.fragile { color: var(--alert-color); }
.exposed { color: var(--warning-color); }
.critical { color: var(--danger-color); }

.advices-section {
  margin-top: 50px;
  animation: fadeIn 1s 1.5s forwards;
  opacity: 0;
}
.advices-title { color: var(--text-color); font-size: 1.5rem; margin-bottom: 20px; }
.advice-card {
  background: var(--bg-glass); border-left: 4px solid var(--warning-color);
  padding: 20px; border-radius: 4px; margin-bottom: 15px;
}
.advice-card h4 { margin: 0 0 10px 0; font-size: 1.1rem; color: var(--text-color); }
.advice-card p { margin: 0; color: var(--text-muted); line-height: 1.5; font-size: 0.95rem;}

.actions { margin-top: 50px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;}
.actions button { width: 100%; max-width: 250px; }

.export-btn { 
  background: var(--bg-solid); color: var(--text-inverse); font-weight: bold; border: none;
  padding: 16px 24px; border-radius: 8px; cursor: pointer; transition: 0.2s; 
}
.export-btn:hover { transform: scale(1.05); }
.reset-btn { 
  background: transparent; border: 1px solid var(--border-color); color: var(--text-color);
  padding: 16px 24px; border-radius: 8px; cursor: pointer; transition: 0.2s;
}
.reset-btn:hover { background: var(--bg-glass); }

@keyframes fadeIn { to { opacity: 1; } }

@media (max-width: 700px) {
  .advice-card h4 { font-size: 1.0rem }
  .advice-card p { font-size: 0.8rem }
}
</style>