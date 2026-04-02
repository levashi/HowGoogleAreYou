export const scenarioBlocks = [
  {
    time: "T+0 min",
    condition: () => true,
    text: `Notification laconique sur ton téléphone : "Votre compte a été suspendu pour violation des conditions d'utilisation." Pas d'email préalable. Pas d'explication. Pas d'humain à appeler.`
  },
  {
    time: "T+2 min",
    condition: (vars) => vars.is_google_email || vars.is_apple_email,
    text: `Tu demandes un lien de récupération. L'assistance automatisée t'envoie un code de vérification sur... ton adresse principale. Celle qui vient d'être suspendue. La boucle infernale commence.`
  },
  {
    time: "T+5 min",
    condition: (vars) => vars.bad_pw,
    text: `Tu essaies de te connecter à un autre service pour appeler à l'aide. Mais ton gestionnaire de mots de passe, c'est ton navigateur, ou ton compte cloud. Tu ne te souviens d'aucun de tes 150 mots de passe. Tu es virtuellement bâillonné.`
  },
  {
    time: "T+10 min",
    condition: (vars) => vars.bad_2fa,
    text: `Tu tentes une connexion de secours. On te demande le code de double authentification. Mais la notification s'envoie sur l'appareil déconnecté, ou l'app 2FA est stockée sur le cloud que tu viens de perdre. Accès refusé.`
  },
  {
    time: "T+15 min",
    condition: (vars) => vars.is_sso_addict,
    text: `Tu cherches une porte dérobée. Outils de travail, divertissement... Tu cliquais toujours sur "Se connecter avec Google/Apple". Netflix s'arrête. Notion est bloqué. Chaque porte est verrouillée par la même serrure cassée.`
  },
  {
    time: "T+1 h",
    condition: (vars) => vars.has_critical_data,
    text: `Le silence retombe. Tu réalises l'étendue des dégâts. Tes données personnelles et tes souvenirs photographiques ne sont pas "inaccessibles temporairement". Sans backup physique chez toi, ils sont scellés numériquement. À jamais.`
  },
  {
    time: "T+3 h",
    condition: (vars) => vars.is_pro_finance,
    text: `Par effet domino, ta banque détecte une anomalie et gèle tes virements par mesure de sécurité. Ils t'envoient le lien de déblocage sur ton adresse principale. Tu ne peux plus accéder à ton propre argent sans te déplacer en agence.`
  },
  {
    time: "Bilan",
    condition: (vars) => vars.rupturePointsCount === 0,
    text: `Finalement, la suspension de ton compte t'ennuie, mais elle ne te détruit pas. Tu as su compartimenter tes accès. Tes mots de passe sont chez toi, tes emails vitaux aussi, et tes sauvegardes sont au chaud. Tu es un survivant numérique.`
  }
];