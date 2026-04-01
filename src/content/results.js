/**
 * TEXTES DES RÉSULTATS
 * --------------------
 * Ces textes utilisent un système de templating (géré dans src/utils/scoring.js).
 * Variables injectables : {{email_provider}}, {{years_on_platform}}, etc.
 * Blocs conditionnels : {{#if has_local_backup}} Texte... {{/if}}
 */

export const results = {
  resilient: `Tu as une stratégie saine.
  
Si ton fournisseur principal disparaît demain, ce sera un mauvais moment à passer, mais ta vie numérique n'est pas en danger. Tu as évité le piège du "tout-en-un" magique.

{{#if has_local_backup}}
Surtout, ta copie locale te protège de l'effacement arbitraire. Bravo pour ça.
{{/if}}`,

  fragile: `Tu as mis pas mal d'oeufs dans le même panier.

Ton compte {{email_provider}} n'est pas qu'une boîte mail, c'est ta clé passe-partout. Un algorithme te bloque demain, et tu seras surpris de voir à quelle vitesse les murs se referment.

{{#if sso_level}}
Ces applications où tu te connectes en un clic ? Elles te fermeront leurs portes en même temps.
{{/if}}

Il suffirait d'un incident pour te paralyser plusieurs jours.`,

  exposed: `T'es à un email de tout perdre.

Imagine que tu te réveilles demain et que ton compte {{email_provider}} ne répond plus. Pas de message d'erreur clair. Juste : "Ce compte a été suspendu."

{{#if years_on_platform}}
{{years_on_platform}} ans d'historique partis en fumée en une fraction de seconde.
{{/if}}

{{#if storage_services}}
Et pour couronner le tout, ce que tu avais sur {{storage_services}} devient instantanément inaccessible.
{{/if}}

{{#if has_pro_website}}
Même ton site web pourrait tomber, vu que son administration dépend du même compte.
{{/if}}

Tu as construit une maison sur un terrain qui ne t'appartient pas.`,

  critical: `C'est une maison de cartes.

Ta dépendance à {{email_provider}} est totale. Si ce service décide que tu as enfreint ses conditions d'utilisation (et ça arrive automatiquement par erreur), ta vie numérique s'arrête net.

Plus d'email. Plus de contacts. 
{{#if storage_services}}
Tout ce qui est sur {{storage_services}} disparaît.
{{/if}}

Ce n'est pas "si" ça arrive, c'est "quand". Tu n'es pas le client de ces plateformes, tu es un locataire précaire sans contrat de bail. Commence à exporter tes données dès aujourd'hui.`
};