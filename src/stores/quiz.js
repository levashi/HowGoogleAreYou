import { defineStore } from 'pinia';
import { questions } from '../content/questions';
import { results } from '../content/results';
import { renderTemplate } from '../utils/scoring';

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    phase: 'intro', // 'intro', 'quiz', 'result'
    currentQuestionId: null,
    answers: {},
    history: [],
    mascotMessage: "Salut ! Je suis AuditBot. Je suis là pour évaluer tes risques.",
  }),

  getters: {
    currentQuestion: (state) => questions.find(q => q.id === state.currentQuestionId),
    
    stateComputation: (state) => {
      let scoreRaw = 0;
      let scoreMax = 0;
      let profileVars = {};
      let dimensions = { email: 0, storage: 0, identity: 0, domain: 0, recovery: 0 };
      
      for (const qId of state.history) {
        const q = questions.find(q => q.id === qId);
        const answer = state.answers[qId];
        
        if (q && answer !== undefined) {
          const delta = q.score(answer);
          scoreRaw += delta * q.weight;
          scoreMax += 10 * q.weight;
          
          if (q.theme && dimensions[q.theme] !== undefined) {
            dimensions[q.theme] += delta * q.weight;
          }

          if (q.profileVar) {
            profileVars[q.profileVar] = answer;
          }
        }
      }

      let scoreNormalized = scoreMax === 0 ? 0 : Math.round(Math.max(0, Math.min(100, (scoreRaw / scoreMax) * 100)));

      let profile = 'resilient';
      if (scoreNormalized > 75) profile = 'critical';
      else if (scoreNormalized > 50) profile = 'exposed';
      else if (scoreNormalized > 25) profile = 'fragile';

      return { scoreRaw, scoreMax, scoreNormalized, profileVars, dimensions, profile };
    },

    scoreNormalized() { return this.stateComputation.scoreNormalized },
    profile() { return this.stateComputation.profile },
    dimensions() { return this.stateComputation.dimensions },
    profileVars() { return this.stateComputation.profileVars },

    renderedScript() {
      const template = results[this.profile];
      return renderTemplate(template, this.profileVars);
    }
  },

  actions: {
    startQuiz() {
      this.phase = 'quiz';
      this.currentQuestionId = questions[0].id;
      this.answers = {};
      this.history = [];
      this.mascotMessage = "C'est parti ! Commence par m'en dire plus sur tes emails.";
    },

    answerQuestion(answer) {
      const q = this.currentQuestion;
      this.answers[q.id] = answer;
      this.history.push(q.id);

      // On déclenche la réaction de la mascotte par rapport au choix effectué
      if (q.mascotReaction) {
        this.mascotMessage = q.mascotReaction(answer);
      }

      const nextId = q.next(answer);
      if (nextId) {
        this.currentQuestionId = nextId;
      } else {
        this.phase = 'result';
        // Petit message de la mascotte avant qu'elle n'affiche le résultat sur l'écran
        this.mascotMessage = "C'est bon, j'ai fini mes calculs ! Regarde ton résultat.";
      }
    },

    goBack() {
      if (this.history.length === 0) {
        this.phase = 'intro';
        this.mascotMessage = "On recommence ?";
        return;
      }
      const prevId = this.history.pop();
      delete this.answers[prevId];
      this.currentQuestionId = prevId;
      this.mascotMessage = "Pas de souci, on corrige ça !";
    },

    reset() {
      this.phase = 'intro';
      this.currentQuestionId = null;
      this.answers = {};
      this.history = [];
      this.mascotMessage = "Prêt à refaire l'audit ?";
    }
  }
});