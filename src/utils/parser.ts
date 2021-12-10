import { nanoid } from './nanoid';
import { marked } from 'marked';
import { createVueSFCModule } from './compiler';

interface ParsedComponent {
  template: string;
  styles: string;
  script: string;
}

export interface ParsedComponentWithId extends ParsedComponent {
  id: string;
}

const VUE_SFC_REGEX = /<vue-sfc>\r?\n([\S\s]+?)\r?\n<\/vue-sfc>/gim;

const getVueSFCTemplates = (content: string) => {
  let transformedContent = content;
  const sfcTemplates = [...content.matchAll(VUE_SFC_REGEX)].map((parts) => {
    const sfcId = nanoid();
    transformedContent = transformedContent.replace(parts[0], `<div id="markvue-${sfcId}"></div>`);
    return {
      id: sfcId,
      sfc: parts[1],
    };
  });
  return {
    transformedContent,
    templates: sfcTemplates,
  };
};

const IMPORT_REGEX = /import\s+(.+)\s+from\s*["'](.+);?["']/gi;

const transformImports = (script: string) => {
  const importMatches = [...script.matchAll(IMPORT_REGEX)].map((item) => {
    let namedImport = false;
    return {
      matched: item[0],
      imported: item[1]
        .split(',')
        .map((part: string) => {
          if (part.includes('{')) {
            namedImport = true;
          }
          const formatted = part.replace('{', '').replace('}', '').trim();
          const ret = namedImport ? `{ ${formatted} }` : formatted;
          if (part.includes('}')) {
            namedImport = false;
          }
          return ret;
        })
        .map((importedComponent: string) => {
          let formatted = importedComponent.trim();
          if (formatted.startsWith('{')) {
            formatted = formatted.replace('{', '').replace('}', '').trim();
            if (formatted.includes('as')) {
              const containAlias = formatted.split('as').map((part) => part.trim());
              return containAlias;
            }
            return `{ ${formatted} }`;
          } else {
            return formatted;
          }
        }),
      from: item[2],
    };
  });
  let ret = script;
  importMatches.forEach((match) => {
    const transformed = match.imported.map((imported) => {
      if (Array.isArray(imported)) {
        return `const { ${imported[0]}: ${imported[1]} } = context['${match.from}']`;
      }
      return `const ${imported} = context['${match.from}']`;
    });
    ret = ret.replace(match.matched, transformed.join('\n'));
  });
  return ret;
};

const transformScriptCode = (id: string, script: string) => {
  const importTransformed = transformImports(script).trim();
  if (importTransformed) {
    return `(function() { window.markVueModules['${id}'].getScript = function (context) {\n${importTransformed.replace(
      'export default',
      'return',
    )}\n}; })()`;
  }
  return '';
};

const transformTemplateCode = (id: string, script: string) => {
  const importTransformed = transformImports(script).trim();
  if (importTransformed) {
    return `(function() { window.markVueModules['${id}'].getTemplate = function (context) {\n${importTransformed.replace(
      'export',
      'return',
    )}\n} })()`;
  }
  return '';
};

export const parse = async (content: string) => {
  const { transformedContent, templates } = getVueSFCTemplates(content);
  const components = await Promise.all(
    templates.map(
      async (item) =>
        ({
          id: item.id,
          ...((await createVueSFCModule(item.id, item.sfc)) as ParsedComponent),
        } as ParsedComponentWithId),
    ),
  );
  // wrap compiled script
  const wrappedComponents: ParsedComponentWithId[] = components.map((item) => ({
    ...item,
    script: transformScriptCode(item.id, item.script),
    template: transformTemplateCode(item.id, item.template),
  }));
  return {
    parsedContent: marked.parse(transformedContent),
    components: wrappedComponents,
  };
};
