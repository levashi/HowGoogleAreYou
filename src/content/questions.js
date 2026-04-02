import { useQuizStore } from "../stores/quiz";

export const questions = [
  {
    id: 'mobile_os',
    theme: 'hardware',
    type: 'single',
    text: "Quel est le système d'exploitation de ton smartphone principal ?",
    options: ["Android classique (Samsung, Pixel, Xiaomi...)", "iOS (Apple iPhone)", "Android dégooglisé (GrapheneOS, /e/OS...)", "Autre (Dumbphone, etc.)"],
    weight: 2,
    profileVar: 'mobile_os',
    score: (answer) => {
      if (answer.startsWith('Android classique')) return 9;
      if (answer.startsWith('iOS')) return 5;
      if (answer.startsWith('Android dégooglisé')) return -5
      return 0;
    },
    mascotReaction: (answer) => {
      if (answer.startsWith('Android classique')) return "Un gros bébé de 2000 milliard de $ au creux de ta main. Prie pour qu'il ne montre pas les crocs";
      if (answer.startsWith('iOS')) return "Apple : ils protègent tes données. Mais te force à utiliser l'app store pour la moindre app.";
      if (answer.includes('dégooglisé')) return "Respect.";
      return "Euh... tu vas bien?";
    },
    next: 'browser'
  },
  {
    id: 'browser',
    theme: 'tracking',
    type: 'single',
    text: "Quel navigateur web utilises-tu par défaut sur ton ordinateur / téléphone ?",
    options: ["Google Chrome / Microsoft Edge", "Safari (Apple)", "Brave / Firefox / Vivaldi / LibreWolf", "Autre"],
    weight: 2,
    profileVar: 'browser',
    score: (answer) => {
      if (answer.includes('Chrome')) return 15;
      if (answer.includes('Safari')) return 0;
      if (answer.includes("Brave")) -10;
      return 2 
    },
    mascotReaction: (answer) => {
      if (answer.includes('Chrome')) return "Chrome te fait croire que tu as besoin de lui. Puis il utilise ton historique pour te recommander des pubs, et interdit les AdBlockers.";
      if (answer.includes('Firefox') || answer.includes('Brave')) return "La SEULE bonne réponse";
      if (answer.includes('Safari')) return "C'est privé, mais seulement si Apple le veut...";
      return "D'accord, continuons...";
    },
    next: 'primary_email'
  },
  {
    id: 'primary_email',
    theme: 'email',
    type: 'single',
    text: "Où est hébergée ton adresse email PRINCIPALE (celle de la banque, des impôts) ?",
    options: ["Google (Gmail) / Microsoft (Outlook)", "Apple (iCloud)", "Service chiffré (ProtonMail, Tuta...)", "Mon propre nom de domaine"],
    weight: 3,
    profileVar: 'primary_email',
    score: (answer) => {
      if (answer.includes('Google') || answer.includes('Microsoft')) return 10;
      if (answer.includes('Apple')) return 8;
      if (answer.includes('Proton')) return -2;
      if (answer.includes("domaine")) return -10;
      return -4;
    },
    mascotReaction: (answer) => {
      if (answer.includes('Google')) return "Toute ta vie administrative dépend d'une clé contrôlée par une régie publicitaire. Magnifique.";
      if (answer.includes("ProtonMail")) return "Je fais pareil. On a la privacy ET la simplicité. Big brain.";
      if (answer.includes('domaine')) return "Excellent. Si l'hébergeur te bloque, tu changes d'hébergeur en gardant ton adresse.";
      return "C'est noté.";
    },
    next: 'password_manager'
  },
  {
    id: 'password_manager',
    theme: 'security',
    type: 'single',
    text: "Tu te connectes à un nouveau PC. Où dois-tu aller en premier pour retrouver tous tes mots de passe ?",
    options: [
      "Sur mon compte Google (Chrome) ou Apple (Trousseau)",
      "Sur un gestionnaire indépendant (Bitwarden, 1Password...)",
      "Nulle part, je les connais de tête ou sur un carnet",
      "Nulle part, j'utilise le même partout"
    ],
    weight: 4,
    profileVar: 'password_manager',
    score: (answer) => {
      if (answer.includes('Google')) return 12;
      if (answer.includes('carnet') || answer.includes('même')) return 3;
      return -5;
    },
    mascotReaction: (answer) => {
      if (answer.includes('Google')) return "Attends... Donc si Google/Apple te bloque l'accès à ce compte principal, tu n'as plus aucun mot de passe pour te connecter à tes autres services de secours ?";
      if (answer.includes('indépendant')) return "Tu as séparé la clé du coffre de la clé de la maison. Très intelligent.";
      if (answer.includes("même")) return "Au moins il n'y a personne dans ta tête. Enfin... je crois?"
      return "Une méthode physique qui ne craint pas le bannissement. Attention aux mots de passe trop simples.";
    },
    next: 'two_factor'
  },
  {
    id: 'two_factor',
    theme: 'security',
    type: 'single',
    text: "Ton téléphone rend l'âme. Tu dois te connecter en urgence à tes mails sur un PC inconnu. Que se passe-t-il au moment de la double authentification ?",
    options: [
      "Je suis bloqué : l'alerte 'Appuyez sur Oui' s'affiche sur mon téléphone mort.",
      "Je suis bloqué : le SMS arrive sur ma SIM qui est dans le téléphone cassé/perdu.",
      "Je passe par ma clef physique, ou une app 2FA synchronisée ailleurs.",
      "Je n'ai pas activé la double authentification",
      "J'ai un autre appareil connecté à mon compte Google pour regler le probleme voyons"
    ],
    weight: 3,
    profileVar: 'two_factor',
    score: (answer) => {
      if (answer.includes('Appuyez sur Oui')) return 10;
      if (answer.includes('SMS')) return 8;
      if (answer.includes('pas activé')) return 12;
      return -5;
    },
    mascotReaction: (answer) => {
      if (answer.includes('Appuyez sur Oui') || answer.includes('SMS')) return "La fameuse boucle de la mort. Ton compte exige l'appareil pour te laisser entrer, mais tu ne peux configurer ton nouvel appareil sans accès à ton compte.";
      if (answer.includes('codes de secours')) return "Tu as anticipé la faille du système. Chapeau.";
      if (answer.includes('pas activé')) return "Tu ne risques pas la boucle de la mort, mais un hacker en Russie a juste besoin de ton mot de passe pour te voler ta vie entière.";
      return "Ok, continuons.";
    },
    next: (answer) => {
      const quizz = useQuizStore()
      if (answer.includes("J'ai un autre appareil")){
        quizz.mascotMessage = "Ne joue pas au plus malin avec moi, on part du principe que tu n'a plus accès a ton compte principal"
        return "retry"
      } 
      return "sso_apps"
    }
  },
  {
    id: 'sso_apps',
    theme: 'identity',
    type: 'multi',
    text: "Sur quels types de services te connectes-tu régulièrement avec le bouton magique 'Continuer avec Google / Apple' ?",
    options: [
      "Divertissement (Spotify, Netflix...)",
      "Outils de travail (Notion, Slack, Canva...)",
      "Réseaux sociaux (Discord, TikTok...)",
      "Je n'utilise pas ces boutons, je crée un mot de passe à chaque fois"
    ],
    min: 1,
    weight: 3,
    profileVar: 'sso_apps',
    score: (answer) => {
      if (answer.includes("Je n'utilise pas ces boutons")) return -5;
      return answer.length * 4;
    },
    mascotReaction: (answer) => {
      if (answer.includes("Je n'utilise pas ces boutons")) return "C'est plus long à configurer, mais tu es libre. Si Google te bannit ce soir, Spotify continuera de jouer demain.";
      return "Une clé pour les gouverner tous. Si ton compte principal saute, c'est comme si toutes ces portes se verrouillaient instantanément de l'extérieur.";
    },
    next: 'pro_finance'
  },
  {
    id: 'pro_finance',
    theme: 'finance',
    type: 'single',
    text: "Ta banque détecte une activité suspecte et bloque ta carte. Ils t'envoient un lien de déblocage par email. Si cet email est ton adresse Google/Apple bloquée :",
    options: [
      "Je suis bloqué bancairement jusqu'à ce que je prouve mon identité en agence physique.",
      "Pas de souci, j'utilise une adresse email différente (et accessible) pour ma banque."
    ],
    weight: 4,
    profileVar: 'pro_finance',
    score: (answer) => {
      if (answer.includes('bloqué bancairement')) return 15;
      return -5;
    },
    mascotReaction: (answer) => {
      if (answer.includes('bloqué bancairement')) return "Le fameux effet domino. Une IA américaine désactive ton compte cloud pour une fausse raison, et par ricochet, tu ne peux plus payer tes courses en France.";
      return "C'est le pare-feu ultime. L'argent doit être hermétiquement séparé du cloud grand public.";
    },
    next: 'critical_services'
  },
  {
    id: 'critical_services',
    theme: 'storage',
    type: 'multi',
    text: "Si une IA bannit ton compte cloud cette nuit sans aucune intervention humaine, que perds-tu sans aucun recours possible ?",
    options: [
      "Toutes mes photos de famille et souvenirs (Photos / iCloud)",
      "Mes documents vitaux et archives (Drive / Docs)",
      "Des abonnements (l'App Store continue de facturer sans que je puisse annuler)",
      "Rien de tout ça, je sauvegarde tout sur un disque dur externe."
    ],
    min: 1,
    weight: 3,
    profileVar: 'critical_services',
    score: (answer) => {
      if (answer.includes("Rien de tout ça")) return -10;
      return answer.length * 4;
    },
    mascotReaction: (answer) => {
      if (answer.includes("Rien de tout ça")) return "Tu as compris que 'le cloud', c'est juste l'ordinateur de quelqu'un d'autre.";
      if (answer.includes("abonnements")) return "Le fameux abonnement fantôme. L'accès est coupé mais la facturation continue en arrière-plan.";
      return "Des années de vie numérique évaporées en un millième de seconde par un faux-positif de modération.";
    },
    next: null
  }
];