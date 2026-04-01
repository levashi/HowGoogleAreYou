export const scenarioBlocks = [
  {
    time: "T+0 min",
    condition: () => true,
    text: `Notification sur ton téléphone : "Votre compte a été suspendu pour violation des conditions d'utilisation." Pas d'email. Pas d'explication. Pas d'humain à appeler.`
  },
  {
    time: "T+2 min",
    condition: (vars) => vars.is_google_email || vars.is_apple_email,
    text: `Tu demandes un lien de récupération. L'assistance automatisée t'envoie un code de vérification sur... ton adresse principale. L'adresse suspendue. La boucle est fermée.`
  },
  {
    time: "T+5 min",
    condition: (vars) => vars.bad_pw,
    text: `Tu essaies de te connecter directement à un autre service pour contacter quelqu'un. Ton gestionnaire de mots de passe, c'est ton navigateur. Le navigateur est lié à ce compte. Tu ne te souviens d'aucun mot de passe. Tu ne peux aller nulle part.`
  },
  {
    time: "T+10 min",
    condition: (vars) => vars.bad_2fa,
    text: `Tu tentes une connexion avec un ancien mot de passe. On te demande le code de double authentification. Mais ton application 2FA est synchronisée sur le cloud de ton compte suspendu, ou via un numéro lié. L'accès t'est refusé.`
  },
  {
    time: "T+15 min",
    condition: (vars) => vars.is_sso_addict,
    text: `Tu ouvres chacune de tes applications en cherchant un accès de secours. "Se connecter avec Google/Apple". Netflix, Spotify, tes outils de travail... Chaque porte que tu essaies est verrouillée par la même serrure cassée.`
  },
  {
    time: "T+1 h",
    condition: (vars) => vars.has_critical_data,
    text: (vars) => {
      const services = vars.critical_services.filter(v => v !== "Aucun de ces services").join(', ');
      return `Tu réalises l'étendue des dégâts. Tes données personnelles, tes souvenirs, tout ce qui est dans ${services}. Ce n'est pas "inaccessible" temporairement. C'est scellé.`;
    }
  },
  {
    time: "T+3 h",
    condition: (vars) => vars.is_pro_finance,
    text: `Tu dois faire un virement urgent et tu contactes ta banque. Par mesure de sécurité, ils déclenchent une vérification et envoient le code sur ton adresse principale. Celle qui n'existe plus pour toi. Tu ne peux pas confirmer ta propre identité.`
  },
  {
    time: "T+24 h",
    condition: (vars) => vars.no_local_backup && vars.has_critical_data,
    text: `Un jour entier s'est écoulé. Puisque tu n'as pas de sauvegarde locale, ton patrimoine numérique est virtuellement détruit. Tu n'as aucun moyen de revenir en arrière. Tes données appartenaient à une IA.`
  },
  {
    time: "T+24 h",
    condition: (vars) => !vars.no_local_backup && vars.has_critical_data,
    text: `Un jour entier s'est écoulé. Heureusement, tu as une sauvegarde locale. Tes souvenirs sont en sécurité sur ton disque dur, mais tu as perdu ton identité numérique et tes moyens de contact.`
  },
  {
    time: "Bilan",
    condition: (vars) => vars.rupturePointsCount === 0,
    text: `Finalement, la suspension de ton compte t'ennuie, mais elle ne te détruit pas. Tu as su compartimenter tes accès. Ton mot de passe est chez toi, tes emails vitaux aussi, et tes sauvegardes sont au chaud. Tu es un survivant numérique.`
  }
];