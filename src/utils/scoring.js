// Parse le template avec les variables fournies
export function renderTemplate(template, vars) {
  let result = template;

  // 1. Gérer les blocs conditionnels: {{#if var}} ... {{/if}}
  const ifRegex = /{{\s*#if\s+([a-zA-Z0-9_]+)\s*}}([\s\S]*?){{\s*\/if\s*}}/g;
  result = result.replace(ifRegex, (match, varName, content) => {
    // Évalue à vrai si la variable existe et n'est pas "false" ou vide
    const val = vars[varName];
    const isTruthy = val && val !== 'Non' && val !== false && (!Array.isArray(val) || val.length > 0);
    return isTruthy ? content : '';
  });

  // 2. Remplacer les variables standards: {{var}}
  const varRegex = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;
  result = result.replace(varRegex, (match, varName) => {
    let val = vars[varName];
    if (Array.isArray(val)) return val.join(', ');
    return val !== undefined ? val : `[${varName}]`;
  });

  // 3. Clean up extra newlines
  return result.replace(/\n{3,}/g, '\n\n').trim();
}