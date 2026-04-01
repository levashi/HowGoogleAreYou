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
      if (answer.startsWith('iOS')) return 6;
      return 0;
    },
    mascotReaction: (answer) => {
      if (answer.startsWith('Android classique')) return "L'écosystème Google au creux de ta main. Il voit tout, tout le temps.";
      if (answer.startsWith('iOS')) return "Apple : un écosystème fermé. Très privé, jusqu'à ce qu'ils décident de t'enfermer dehors.";
      if (answer.includes('dégooglisé')) return "Respect. Une vraie rupture matérielle demande des sacrifices.";
      return "Le choix radical de la déconnexion !";
    },
    next: 'browser'
  },
  {
    id: 'browser',
    theme: 'tracking',
    type: 'single',
    text: "Quel navigateur web utilises-tu par défaut sur ton ordinateur / téléphone ?",
    options: ["Google Chrome", "Microsoft Edge", "Safari (Apple)", "Brave / Firefox / Vivaldi / LibreWolf"],
    weight: 2,
    profileVar: 'browser',
    score: (answer) => {
      if (answer === 'Google Chrome' || answer === 'Microsoft Edge') return 10;
      if (answer === 'Safari (Apple)') return 7;
      return 0;
    },
    mascotReaction: (answer) => {
      if (answer === 'Google Chrome') return "Chrome n'est pas qu'un navigateur, c'est une sonde reliée à ton identité Google.";
      if (answer.includes('Brave')) return "Un choix indépendant, tu coupes l'aspiration des données à la source.";
      return "D'accord, continuons.";
    },
    next: 'primary_email'
  },
  {
    id: 'primary_email',
    theme: 'email',
    type: 'single',
    text: "Où est hébergée ton adresse email PRINCIPALE (celle pour la banque, les impôts, l'administratif) ?",
    options: ["Google (Gmail)", "Microsoft (Outlook/Hotmail)", "Apple (iCloud)", "Service chiffré (ProtonMail, Tuta...)", "Mon propre nom de domaine"],
    weight: 3,
    profileVar: 'primary_email',
    score: (answer) => {
      if (answer.includes('Gmail')) return 10;
      if (answer.includes('Microsoft') || answer.includes('Apple')) return 8;
      if (answer.includes('Proton')) return 2;
      return 0;
    },
    mascotReaction: (answer) => {
      if (answer.includes('Gmail')) return "Toute ta vie administrative dépend d'une clé contrôlée par une régie publicitaire.";
      if (answer.includes('domaine')) return "Excellent. Si l'hébergeur te bloque, tu changes d'hébergeur en gardant ton adresse.";
      return "C'est noté. L'email est le passe-partout du net.";
    },
    next: 'password_manager'
  },
  {
    id: 'password_manager',
    theme: 'security',
    type: 'single',
    text: "Comment stockes-tu la majorité de tes mots de passe ?",
    options: ["Dans Google Chrome / Mon compte Google", "Dans le Trousseau Apple (iCloud)", "Un gestionnaire indépendant (Bitwarden, 1Password...)", "Dans ma tête ou sur un carnet"],
    weight: 3,
    profileVar: 'password_manager',
    score: (answer) => {
      if (answer.includes('Google Chrome')) return 10;
      if (answer.includes('Apple')) return 8;
      if (answer.includes('carnet')) return 4;
      return 0;
    },
    mascotReaction: (answer) => {
      if (answer.includes('Google Chrome')) return "Danger : Un robot Google te bloque Gmail, tu perds AUSSI tes mots de passe d'un coup.";
      if (answer.includes('indépendant')) return "La séparation des pouvoirs. C'est la règle d'or pour survivre.";
      return "Une méthode physique, attention aux mots de passe trop simples ou répétés.";
    },
    next: 'two_factor'
  },
  {
    id: 'two_factor',
    theme: 'security',
    type: 'single',
    text: "Pour la Double Authentification (2FA) sur tes comptes sensibles, qu'utilises-tu le plus ?",
    options: ["SMS (Numéro de téléphone)", "Google Authenticator / Microsoft Auth", "App indépendante (Aegis, Ente, Bitwarden...)", "Clé physique (Yubikey) / Je n'en ai pas"],
    weight: 2,
    profileVar: 'two_factor',
    score: (answer) => {
      if (answer.includes('SMS')) return 8; // Risque de SIM swap
      if (answer.includes('Google Authenticator')) return 9; // Lie au cloud propriétaire
      return 0;
    },
    mascotReaction: (answer) => {
      if (answer.includes('SMS')) return "Le SMS est facilement interceptable (SIM Swapping). À éviter pour la banque.";
      if (answer.includes('Google Authenticator')) return "Encore une clé enfermée chez Google. Si tu perds ton compte, tu perds tes codes.";
      if (answer.includes('App indépendante')) return "Parfait, surtout si tu fais des backups chiffrés de tes tokens !";
      return "Sécurisé ou risqué, tout dépend de la méthode exacte, on avance.";
    },
    next: 'critical_services'
  },
  {
    id: 'critical_services',
    theme: 'storage',
    type: 'multi',
    text: "Parmi ces services Google, lesquels contiennent des données que tu n'as NULLE PART ailleurs ?",
    options: ["Google Photos", "Google Drive", "YouTube (Vidéos perso ou Playlists)", "Google Agenda et Contacts", "Aucun de ces services"],
    min: 1,
    weight: 2,
    profileVar: 'critical_services',
    score: (answer) => {
      if (answer.includes("Aucun de ces services")) return 0;
      return answer.length * 2.5;
    },
    mascotReaction: (answer) => {
      if (answer.includes("Aucun de ces services")) return "Impressionnant ! Le cordon ombilical avec l'hyper-cloud est coupé.";
      return "C'est beaucoup de valeur personnelle et sentimentale concentrée au même endroit.";
    },
    next: 'maps'
  },
  {
    id: 'maps',
    theme: 'tracking',
    type: 'single',
    text: "Quelle application utilises-tu pour tes déplacements quotidiens (GPS) ?",
    options: ["Google Maps / Waze (Google)", "Apple Plans", "OpenStreetMap / Organic Maps / Magic Earth"],
    weight: 1,
    profileVar: 'maps',
    score: (answer) => {
      if (answer.includes('Google Maps')) return 10;
      if (answer.includes('Apple Plans')) return 5;
      return 0;
    },
    mascotReaction: (answer) => {
      if (answer.includes('Google Maps')) return "Ils connaissent ta maison, ton travail et tes habitudes de déplacement à la minute près.";
      if (answer.includes('OpenStreetMap')) return "Cartographie collaborative et sans pistage. Magnifique !";
      return "Un choix classique.";
    },
    next: 'sso_google'
  },
  {
    id: 'sso_google',
    theme: 'identity',
    type: 'scale',
    text: "À quelle fréquence utilises-tu le bouton \"Se connecter avec Google / Apple\" pour créer des comptes ailleurs ?",
    min: 1,
    max: 5,
    labels: { min: "Jamais", max: "Partout" },
    weight: 2,
    profileVar: 'sso_level',
    score: (answer) => (answer - 1) * 2.5,
    mascotReaction: (answer) => {
      if (answer >= 4) return "Un vrai château de cartes. Retire la carte Google, toutes les portes se verrouillent.";
      if (answer <= 2) return "Créer des comptes séparés est plus long, mais te garantit l'indépendance.";
      return "Pratique, mais chaque clic resserre tes liens avec la plateforme.";
    },
    next: 'pro_finance'
  },
  {
    id: 'pro_finance',
    theme: 'finance',
    type: 'binary',
    text: "Ton compte mail principal est-il lié à tes revenus ou accès bancaires (AdSense, Impôts, Applis de banque...) ?",
    options: ["Oui", "Non"],
    weight: 3,
    profileVar: 'pro_finance',
    score: (answer) => answer === 'Oui' ? 10 : 0,
    mascotReaction: (answer) => {
      if (answer === 'Oui') return "Alerte rouge. Une IA de modération a littéralement le pouvoir de geler tes finances.";
      return "Ouf. Séparer l'argent du reste évite bien des catastrophes en chaîne.";
    },
    next: 'local_backup'
  },
  {
    id: 'local_backup',
    theme: 'recovery',
    type: 'binary',
    text: "As-tu une sauvegarde physique (un disque dur externe chez toi) récente et complète de tout ton cloud ?",
    options: ["Oui", "Non"],
    weight: 4,
    profileVar: 'has_local_backup',
    score: (answer) => answer === 'Oui' ? -8 : 10,
    mascotReaction: (answer) => {
      if (answer === 'Oui') return "MAGNIFIQUE. Le cloud n'est que l'ordinateur de quelqu'un d'autre. Ton disque dur est à toi.";
      return "S'ils coupent les serveurs ou ton compte, l'intégralité de tes souvenirs part en fumée. Définitivement.";
    },
    next: null
  }
];