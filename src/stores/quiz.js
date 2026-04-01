import { defineStore } from 'pinia';
import { questions } from '../data/questions.mock';
import { templates } from '../scripts/templates';
import { renderTemplate } from '../utils/scoring';

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    phase: 'intro', // 'intro', 'quiz', 'result'
    currentQuestionId: null,
    answers: {},
    history: [], // Pile des ID de questions pour le retour
  }),

  getters: {
    currentQuestion: (state) => questions.find(q => q.id === state.currentQuestionId),
    
    // Recalcule tout dynamiquement pour s'assurer que l'état est parfait (surtout lors des retours en arrière)
    stateComputation: (state) => {
      let scoreRaw = 0;
      let scoreMax = 0;
      let profileVars = {};
      let dimensions = { email: 0, storage: 0, identity: 0, domain: 0, recovery: 0 };
      
      // On rejoue l'historique pour calculer le score exact
      for (const qId of state.history) {
        const q = questions.find(q => q.id === qId);
        const answer = state.answers[qId];
        
        if (q && answer !== undefined) {
          const delta = q.score(answer);
          scoreRaw += delta * q.weight;
          scoreMax += 10 * q.weight; // Max théorique est 10 * poids
          
          if (q.theme && dimensions[q.theme] !== undefined) {
            dimensions[q.theme] += delta * q.weight;
          }

          if (q.profileVar) {
            profileVars[q.profileVar] = answer;
          }
        }
      }

      // Normalisation 0-100
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
      const template = templates[this.profile];
      return renderTemplate(template, this.profileVars);
    }
  },

  actions: {
    startQuiz() {
      this.phase = 'quiz';
      this.currentQuestionId = questions[0].id;
      this.answers = {};
      this.history = [];
    },

    answerQuestion(answer) {
      const q = this.currentQuestion;
      this.answers[q.id] = answer;
      this.history.push(q.id);

      const nextId = q.next(answer);
      if (nextId) {
        this.currentQuestionId = nextId;
      } else {
        this.phase = 'result';
      }
    },

    goBack() {
      if (this.history.length === 0) {
        this.phase = 'intro';
        return;
      }
      // On dépile la dernière question
      const prevId = this.history.pop();
      delete this.answers[prevId];
      this.currentQuestionId = prevId;
    },

    reset() {
      this.phase = 'intro';
      this.currentQuestionId = null;
      this.answers = {};
      this.history = [];
    }
  }
});