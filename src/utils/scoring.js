// Parse le template avec les variables fournies
export function renderTemplate(template, vars) {
  let result = template;

  // Fonction helper pour déterminer si une variable est "vraie"
  const isTruthy = (val) => {
    if (val === undefined || val === null || val === false || val === 'Non') return false;
    if (Array.isArray(val)) {
      if (val.length === 0 || val.includes("Aucun de ces services")) return false;
    }
    return true;
  };

  // 1. Gérer les blocs conditionnels: {{#if var}} ... {{/if}}
  const ifRegex = /{{\s*#if\s+([a-zA-Z0-9_]+)\s*}}([\s\S]*?){{\s*\/if\s*}}/g;
  result = result.replace(ifRegex, (match, varName, content) => {
    return isTruthy(vars[varName]) ? content : '';
  });

  // 1.5 Gérer les blocs inverses: {{#unless var}} ... {{/unless}}
  const unlessRegex = /{{\s*#unless\s+([a-zA-Z0-9_]+)\s*}}([\s\S]*?){{\s*\/unless\s*}}/g;
  result = result.replace(unlessRegex, (match, varName, content) => {
    return !isTruthy(vars[varName]) ? content : '';
  });

  // 2. Remplacer les variables standards: {{var}}
  const varRegex = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;
  result = result.replace(varRegex, (match, varName) => {
    let val = vars[varName];
    if (Array.isArray(val)) {
      val = val.filter(v => v !== "Aucun de ces services");
      return val.length > 0 ? val.join(', ') : 'rien';
    }
    return val !== undefined ? val : `[${varName}]`;
  });

  // 3. Clean up extra newlines
  return result.replace(/\n{3,}/g, '\n\n').trim();
}