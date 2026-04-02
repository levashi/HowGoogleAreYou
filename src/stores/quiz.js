import { defineStore } from 'pinia';
import { questions } from '../content/questions';
import { scenarioBlocks } from '../content/results';
import { advices } from '../content/advices';

function getMaxDepth(qId, visited = new Set()) {
  if (!qId || visited.has(qId)) return 0;
  visited.add(qId);
  
  const q = questions.find(x => x.id === qId);
  if (!q) return 0;

  let nextIds = [];
  if (typeof q.next === 'string') nextIds.push(q.next);
  else if (q.next !== null && typeof q.next === 'object') {
    nextIds = Object.values(q.next).filter(id => id !== null);
  } else if (typeof q.next === 'function' && q.options) {
    q.options.forEach(opt => {
      const res = q.next(opt);
      if (res) nextIds.push(res);
    });
  }
  
  if (nextIds.length === 0) return 1;
  let maxChildDepth = 0;
  for (const id of nextIds) {
    maxChildDepth = Math.max(maxChildDepth, getMaxDepth(id, new Set(visited)));
  }
  return 1 + maxChildDepth;
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    phase: 'intro', // 'intro', 'quiz', 'analyzing', 'result'
    currentQuestionId: null,
    answers: {},
    history: [],
    mascotMessage: "Hey ! Je suis PrivacyBot. Je suis là pour voir si l'algorithme d'un géant du web peut ruiner ta vie en un clic. Prêt ?",
    navDirection: 'forward'
  }),

  getters: {
    currentQuestion: (state) => questions.find(q => q.id === state.currentQuestionId),
    
    stepProgress: (state) => {
      const currentStep = state.history.length + 1;
      const totalSteps = state.history.length + getMaxDepth(state.currentQuestionId);
      return { current: currentStep, total: totalSteps };
    },

    stateComputation: (state) => {
      let scoreRaw = 0;
      let scoreMax = 0;
      let profileVars = {};
      
      for (const qId of state.history) {
        const q = questions.find(q => q.id === qId);
        const answer = state.answers[qId];
        
        if (q && answer !== undefined) {
          const delta = q.score(answer);
          scoreRaw += delta * q.weight;
          scoreMax += 15 * q.weight; 
          if (q.profileVar) profileVars[q.profileVar] = answer;
        }
      }

      let scoreNormalized = scoreMax === 0 ? 0 : Math.round(Math.max(0, Math.min(100, (scoreRaw / scoreMax) * 100)));

      let profile = 'resilient';
      if (scoreNormalized > 70) profile = 'critical';
      else if (scoreNormalized > 45) profile = 'exposed';
      else if (scoreNormalized > 20) profile = 'fragile';

      profileVars.is_google_email = profileVars.primary_email?.includes('Google');
      profileVars.is_apple_email = profileVars.primary_email?.includes('Apple');
      
      profileVars.bad_pw = profileVars.password_manager && profileVars.password_manager.includes('Google');
      profileVars.bad_2fa = profileVars.two_factor && (profileVars.two_factor.includes('Appuyez sur Oui') || profileVars.two_factor.includes('SMS'));
      profileVars.bad_browser = profileVars.browser && profileVars.browser.includes('Chrome');
      
      profileVars.has_critical_data = profileVars.critical_services && profileVars.critical_services.length > 0 && !profileVars.critical_services.includes('Rien de tout ça');
      profileVars.no_local_backup = profileVars.has_critical_data; 
      
      profileVars.is_sso_addict = profileVars.sso_apps && profileVars.sso_apps.length > 0 && !profileVars.sso_apps.includes("Je n'utilise pas");
      profileVars.is_pro_finance = profileVars.pro_finance && profileVars.pro_finance.includes('bloqué bancairement');

      let rupturePointsCount = 0;
      if (profileVars.is_google_email || profileVars.is_apple_email) rupturePointsCount++;
      if (profileVars.bad_pw) rupturePointsCount++;
      if (profileVars.bad_2fa) rupturePointsCount++;
      if (profileVars.is_sso_addict) rupturePointsCount++;
      if (profileVars.has_critical_data) rupturePointsCount++;
      if (profileVars.is_pro_finance) rupturePointsCount++;

      profileVars.rupturePointsCount = rupturePointsCount;

      return { scoreNormalized, profileVars, profile, rupturePointsCount };
    },

    scoreNormalized() { return this.stateComputation.scoreNormalized },
    profile() { return this.stateComputation.profile },
    profileVars() { return this.stateComputation.profileVars },
    rupturePointsCount() { return this.stateComputation.rupturePointsCount },

    activeScenarioBlocks() {
      const vars = this.profileVars;
      return scenarioBlocks.filter(block => block.condition(vars)).map(block => ({
        time: block.time,
        text: typeof block.text === 'function' ? block.text(vars) : block.text
      }));
    },

    actionableAdvices() {
      const vars = this.profileVars;
      return advices.filter(adv => adv.condition(vars));
    }
  },

  actions: {
    saveState() {
      localStorage.setItem('dda_state', JSON.stringify({
        phase: this.phase,
        currentQuestionId: this.currentQuestionId,
        answers: this.answers,
        history: this.history,
        mascotMessage: this.mascotMessage
      }));
    },
    loadState() {
      const saved = localStorage.getItem('dda_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.phase = parsed.phase;
        this.currentQuestionId = parsed.currentQuestionId;
        this.answers = parsed.answers;
        this.history = parsed.history;
        this.mascotMessage = parsed.mascotMessage;
      }
    },

    startQuiz() {
      this.navDirection = 'forward';
      this.phase = 'quiz';
      this.currentQuestionId = questions[0].id;
      this.answers = {};
      this.history = [];
      this.mascotMessage = "C'est parti. Ne mens pas, l'algorithme lit en toi.";
      this.saveState();
    },

    answerQuestion(answer) {
      this.navDirection = 'forward';
      const q = this.currentQuestion;
      this.answers[q.id] = answer;
      this.history.push(q.id);

      if (q.mascotReaction) this.mascotMessage = q.mascotReaction(answer);

      let nextId = null;
      if (typeof q.next === 'string') {
        nextId = q.next;
      } else if (q.next !== null && typeof q.next === 'object') {
        nextId = q.next[answer] !== undefined ? q.next[answer] : (q.next.default || null);
      } else if (typeof q.next === 'function') {
        nextId = q.next(answer);
      }

      if (nextId) {
        this.currentQuestionId = nextId;
      } else {
        this.phase = 'analyzing';
      }
      
      this.saveState();
    },

    showResults() {
      this.phase = 'result';
      this.mascotMessage = "Analyse terminée. L'heure de vérité a sonné.";
      this.saveState();
    },

    goBack() {
      this.navDirection = 'backward';
      if (this.history.length === 0) {
        this.phase = 'intro';
        this.mascotMessage = "Tu hésites ?";
        this.saveState();
        return;
      }
      const prevId = this.history.pop();
      delete this.answers[prevId];
      this.currentQuestionId = prevId;
      this.mascotMessage = "On modifie ça, pas de souci.";
      this.saveState();
    },

    reset() {
      this.navDirection = 'forward';
      this.phase = 'intro';
      this.currentQuestionId = null;
      this.answers = {};
      this.history = [];
      this.mascotMessage = "La curiosité est un vilain défaut, mais recommençons !";
      localStorage.removeItem('dda_state');
    }
  }
});