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
    score: (answer) => Math.min(answer, 10), // Plus c'est vieux, plus l'ancrage est fort (max 10 pts)
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
      if (answer.includes("NAS Personnel")) s -= 5; // Bon point
      return Math.max(s, 0);
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
    next: (answer) => answer === 'Oui' ? 'domain_registrar' : null // Fin si "Non"
  },
  {
    id: 'domain_registrar',
    theme: 'domain',
    type: 'single',
    text: "Le compte d'administration de ce nom de domaine est-il lié à ton adresse email principale ?",
    options: ["Oui", "Non, c'est une adresse séparée"],
    weight: 2,
    score: (answer) => answer === 'Oui' ? 10 : 0,
    next: (answer) => null // Fin
  }
];