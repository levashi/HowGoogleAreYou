export const advices = [
  {
    id: 'extract_passwords',
    title: "Migre tes mots de passe vers un gestionnaire indépendant",
    text: "Laisser Chrome ou Apple gérer tes mots de passe te rend captif de leur écosystème. Installe Bitwarden (open source et gratuit) ou 1Password, et exporte tous tes mots de passe. Si ton compte principal saute, tu pourras toujours te connecter partout ailleurs.",
    condition: (vars) => vars.bad_pw
  },
  {
    id: 'change_2fa',
    title: "Change ta méthode de double authentification",
    text: "Le SMS est très vulnérable (SIM Swapping) et Google Authenticator verrouille tes codes dans le cloud Google. Utilise une application indépendante comme Aegis (Android) ou Raivo/Ente Auth qui te permet d'exporter et de sauvegarder tes codes de secours.",
    condition: (vars) => vars.bad_2fa
  },
  {
    id: 'change_browser',
    title: "Change de navigateur web",
    text: "Chrome et Edge sont des aspirateurs de données directement liés à l'identité cloud. Installe Brave (très similaire à Chrome mais sans le pistage), Firefox ou Vivaldi. C'est l'un des changements les plus faciles à faire avec un impact immédiat.",
    condition: (vars) => vars.bad_browser
  },
  {
    id: 'do_takeout',
    title: "Fais une archive 'Takeout' immédiate",
    text: "Connecte-toi sur takeout.google.com (ou privacy.apple.com). Télécharge l'archive complète de tes Photos, Mails, et Drive. Stocke-la sur un disque dur externe chez toi. Le cloud n'est pas une sauvegarde. Répète ça tous les 6 mois.",
    condition: (vars) => vars.no_local_backup
  },
  {
    id: 'unlink_finance',
    title: "Désolidarise ton argent des géants de la tech",
    text: "Ton compte mail est vital pour tes accès bancaires. Crée immédiatement une adresse email chiffrée (ex: ProtonMail) dédiée UNIQUEMENT à ta banque et tes impôts. Cesse d'utiliser ton adresse habituelle pour ton argent.",
    condition: (vars) => vars.is_pro_finance
  },
  {
    id: 'stop_sso',
    title: "Coupe le cordon de la connexion 'en 1 clic'",
    text: "Fais la liste de tes 5 applications les plus importantes où tu te connectes avec le bouton 'Se connecter avec Google/Apple'. Va dans les paramètres de ces apps et demande à créer un mot de passe classique. Tu reprendras ainsi ton indépendance.",
    condition: (vars) => vars.is_sso_addict
  },
  {
    id: 'custom_domain',
    title: "Deviens propriétaire de ton adresse email",
    text: "Pour une dizaine d'euros par an, achète ton propre nom de domaine. Si tu le relies à une boîte mail indépendante, tu deviens intouchable : si un fournisseur te bloque, tu rediriges simplement ton domaine vers un autre. Tu ne changeras plus jamais d'adresse email.",
    condition: (vars) => vars.is_google_email || vars.is_apple_email
  }
];