/**
 * FICHIER CENTRAL DES QUESTIONS
 * -----------------------------
 * C'est ici que tu peux créer, modifier ou supprimer des questions.
 * 
 * Propriétés importantes :
 * - id : Identifiant unique de la question.
 * - type : 'single', 'multi', 'number', 'scale', 'binary'.
 * - score(answer) : Logique qui retourne les points de vulnérabilité ajoutés (plus c'est haut, pire c'est).
 * - mascotReaction(answer) : Ce que la mascotte va dire APRÈS que l'utilisateur a répondu à cette question.
 * - next(answer) : Retourne l'id de la prochaine question (ou null si fin du quiz).
 */

export const questions = [
  {
    id: 'email_provider',
    theme: 'email',
    type: 'single',
    text: "Où est hébergée ton adresse email principale (celle qui sert à récupérer tes mots de passe) ?",
    options: ["Google (Gmail)", "Microsoft (Outlook/Hotmail)", "Apple (iCloud)", "ProtonMail", "Autre"],
    weight: 3,
    profileVar: 'email_provider',
    score: (answer) => {
      if (['Google (Gmail)', 'Microsoft (Outlook/Hotmail)', 'Apple (iCloud)'].includes(answer)) return 8;
      if (answer === 'ProtonMail') return 2;
      return 5;
    },
    mascotReaction: (answer) => {
      if (answer === 'ProtonMail') return "ProtonMail ? Excellent choix pour la vie privée !";
      if (['Google (Gmail)', 'Microsoft (Outlook/Hotmail)', 'Apple (iCloud)'].includes(answer)) {
        return "Un classique ! Très pratique, mais tes clés sont chez un géant de la tech.";
      }
      return "Intéressant, gardons ça en tête pour la suite.";
    },
    next: (answer) => 'years_on_platform'
  },
  {
    id: 'years_on_platform',
    theme: 'email',
    type: 'number',
    text: "Depuis combien d'années utilises-tu cette adresse comme adresse principale ?",
    unit: "années",
    min: 0,
    max: 30,
    weight: 2,
    profileVar: 'years_on_platform',
    score: (answer) => Math.min(answer, 10), // Max 10 pts d'ancrage
    mascotReaction: (answer) => {
      if (answer >= 10) return `${answer} ans ! Ça commence à faire de sacrées racines...`;
      if (answer <= 3) return "C'est assez récent, tu es encore assez flexible si tu devais changer.";
      return "D'accord, une bonne moyenne.";
    },
    next: (answer) => 'sso_usage'
  },
  {
    id: 'sso_usage',
    theme: 'identity',
    type: 'scale',
    text: "À quelle fréquence utilises-tu le bouton 'Se connecter avec Google / Apple' au lieu de créer un mot de passe ?",
    min: 1,
    max: 5,
    labels: { min: "Jamais (Mots de passe séparés)", max: "Partout (C'est tellement pratique)" },
    weight: 3,
    profileVar: 'sso_level',
    score: (answer) => (answer - 1) * 2.5, // Donne de 0 à 10
    mascotReaction: (answer) => {
      if (answer >= 4) return "C'est rapide de cliquer sur 'Se connecter avec'... mais un seul blocage et tu perds accès à tout !";
      if (answer <= 2) return "Des mots de passe séparés ? Tu as toute mon estime (et celle des experts en sécu).";
      return "Un peu de centralisation, un peu de séparation... un équilibre ?";
    },
    next: (answer) => 'storage_services'
  },
  {
    id: 'storage_services',
    theme: 'storage',
    type: 'multi',
    text: "Quels services de stockage cloud utilises-tu activement pour tes documents et photos ?",
    options: ["Google Drive / Photos", "iCloud Drive", "OneDrive", "Dropbox", "NAS Personnel", "Je n'utilise pas le cloud"],
    min: 0,
    weight: 2,
    profileVar: 'storage_services',
    score: (answer) => {
      if (answer.includes("Je n'utilise pas le cloud")) return 0;
      let s = answer.length * 3;
      if (answer.includes("NAS Personnel")) s -= 5;
      return Math.max(s, 0);
    },
    mascotReaction: (answer) => {
      if (answer.includes("NAS Personnel")) return "Un NAS ! Tu gères tes propres serveurs, j'adore la démarche.";
      if (answer.includes("Je n'utilise pas le cloud")) return "Le bon vieux stockage physique. Zéro risque de censure cloud !";
      if (answer.length > 2) return "Tu éparpilles pas mal de données, c'est bien pour ne pas tout perdre d'un coup.";
      return "Un nuage bien douillet, mais rappelle-toi qu'il ne t'appartient pas totalement.";
    },
    next: (answer) => 'local_backup'
  },
  {
    id: 'local_backup',
    theme: 'recovery',
    type: 'binary',
    text: "As-tu une copie physique DE L'INTÉGRALITÉ de tes données importantes sur un disque dur chez toi ?",
    options: ["Oui", "Non"],
    weight: 3,
    profileVar: 'has_local_backup',
    score: (answer) => answer === 'Oui' ? -10 : 10,
    mascotReaction: (answer) => {
      if (answer === 'Oui') return "EXCELLENT ! C'est la règle d'or absolue pour survivre au numérique.";
      return "Aïe... Promets-moi d'acheter un disque dur externe à la fin de cet audit !";
    },
    next: (answer) => 'pro_website'
  },
  {
    id: 'pro_website',
    theme: 'domain',
    type: 'binary',
    text: "As-tu un site web professionnel ou un nom de domaine personnel ?",
    options: ["Oui", "Non"],
    weight: 1,
    profileVar: 'has_pro_website',
    score: (answer) => answer === 'Oui' ? 2 : 0,
    mascotReaction: (answer) => {
      if (answer === 'Oui') return "Oh, un domaine perso ! Regardons comment il est géré.";
      return "Pas de site web, ça fait toujours un point de défaillance en moins à gérer !";
    },
    next: (answer) => answer === 'Oui' ? 'domain_registrar' : null
  },
  {
    id: 'domain_registrar',
    theme: 'domain',
    type: 'single',
    text: "Le compte d'administration de ce nom de domaine est-il lié à ton adresse email principale ?",
    options: ["Oui", "Non, c'est une adresse séparée"],
    weight: 2,
    score: (answer) => answer === 'Oui' ? 10 : 0,
    mascotReaction: (answer) => {
      if (answer === 'Oui') return "Alerte rouge : si tu perds ton email, tu perds ton site web et ton domaine !";
      return "Parfait, la séparation des pouvoirs, c'est la clé de la résilience.";
    },
    next: (answer) => null
  }
];