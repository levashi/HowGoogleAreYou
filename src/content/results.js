export const results = {
  resilient: `Tu es un survivant numérique.

Félicitations. Tu as compris que la gratuité se payait en contrôle. En ayant compartimenté tes accès et en évitant le piège du "tout-en-un" magique, tu as repris la souveraineté sur ton identité.

Même si un géant du net décide de bannir tes comptes de manière automatisée demain matin, tu survivras sans dommage majeur. 
{{#unless bad_pw}}Tes accès sont gérés de manière autonome,{{/unless}} et ton hygiène numérique est un exemple rare.

Continue d'appliquer cette discipline militaire et de sensibiliser ton entourage. Le monde numérique a besoin de gens comme toi pour prouver qu'il existe une alternative.`,

  fragile: `Tu as commencé à diversifier, mais des maillons vitaux restent exposés.

Tu as conscience du problème, pourtant certaines habitudes te mettent en danger. Le jour où un algorithme décide par erreur que ton compte viole les conditions d'utilisation, tu seras temporairement paralysé.

{{#if is_pro_finance}}
Le point le plus inquiétant, c'est que tes finances y sont liées. Une erreur d'une IA, et c'est potentiellement tes accès bancaires qui sautent sans préavis.
{{/if}}

{{#if bad_pw}}
Le fait de laisser ton navigateur ou ton écosystème gérer tes mots de passe est un piège. Un blocage t'empêcherait d'accéder à l'intégralité de tes autres sites web.
{{/if}}

{{#if no_local_backup}}
De plus, sans sauvegarde locale, tes données ne t'appartiennent pas vraiment. Elles sont juste en location. Une panne sévère ou un blocage et tes souvenirs disparaissent.
{{/if}}

Il est grand temps de couper les derniers cordons qui te lient au monopole du cloud.`,

  exposed: `Tu es à un clic au-dessus du vide.

Tu dépends massivement d'un écosystème fermé. La concentration de tes services crée un goulot d'étranglement extrêmement dangereux.

Si ton compte principal est suspendu par un processus algorithmique automatisé (ce qui arrive tous les jours à des utilisateurs honnêtes, sans intervention humaine) :
- Tu perds immédiatement l'accès à ta boîte de réception.
{{#if bad_pw}}
- Tes mots de passe, enfermés dans le navigateur, s'évaporent instantanément. Tu ne pourras même plus te connecter ailleurs pour changer ton email.
{{/if}}
{{#if has_critical_data}}
- Tes données privées ({{critical_services}}) sont scellées et rendues inaccessibles d'une seconde à l'autre.
{{/if}}

{{#if no_local_backup}}
Puisque tu n'as pas pris la peine de faire une copie physique, tout ton patrimoine numérique est littéralement pris en otage par une multinationale.
{{/if}}

Il suffirait d'un piratage de ton email ou d'un faux signalement robotisé pour te rayer de la carte numérique. Réagis.`,

  critical: `Tu es à la merci d'un algorithme. C'est l'alerte maximale.

Ton adresse {{primary_email}} n'est pas qu'une simple boîte mail, c'est l'épine dorsale de toute ton existence numérique. Tu as confié l'intégralité des clés de ta vie au même acteur.

Une simple suspension de compte (pour une violation fictive de CGU dictée par une IA ou un piratage de ton mot de passe) te déconnecterait du monde. 
{{#if is_sso_addict}}
Vu que tu te connectes partout en un clic via ce compte, toutes les portes du net se fermeront devant toi simultanément.
{{/if}}

{{#if bad_2fa}}
L'utilisation d'une méthode de double authentification liée à ton numéro (SMS) ou à ton compte cloud aggrave le problème. Les pirates raffolent du SIM Swapping.
{{/if}}

{{#if is_pro_finance}}
Le plus terrifiant ? Tes finances y sont directement liées. Une modération automatique aveugle risque de bloquer tes moyens de paiement et te couper de tes banques.
{{/if}}

{{#if no_local_backup}}
Et la disparition de tes données ({{critical_services}}) ne serait pas temporaire : sans disque dur de secours chez toi, c'est une destruction totale. Zéro retour en arrière possible.
{{/if}}

Tu n'es pas le client de ces plateformes, tu es une simple ligne de données dans un serveur géant. La chute sera d'une violence inouïe si tu n'appliques pas la To-Do list ci-dessous dès ce soir.`
};