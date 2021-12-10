import { compileScript, compileStyle, compileTemplate, parse, SFCTemplateCompileOptions } from '@vue/compiler-sfc';
import { nanoid } from './nanoid';

const isProd = process.env.NODE_ENV === 'production';

export const createVueSFCModule = async (id: string, source: string) => {
  const component: { [key: string]: any } = {};
  const { descriptor, errors } = parse(source);

  const templateOptions: SFCTemplateCompileOptions = {
    filename: id,
    source: descriptor.template?.content || '',
    isProd,
    id,
    slotted: descriptor.slotted,
    scoped: descriptor.styles.some((style) => style.scoped),
    ssr: false,
    compilerOptions: {
      mode: 'module',
    },
  };

  if (descriptor.script || descriptor.scriptSetup) {
    const scriptBlock = compileScript(descriptor, {
      isProd,
      id,
      inlineTemplate: false,
      templateOptions: templateOptions,
    });
    templateOptions.compilerOptions!.bindingMetadata = scriptBlock.bindings;
    component.script = scriptBlock.content;
  } else {
    component.script = '';
  }

  if (descriptor.template) {
    component.template = compileTemplate(templateOptions).code;
  } else {
    component.template = '';
  }

  if (descriptor.styles) {
    const styleContents = await Promise.all(
      descriptor.styles.map((style, index) => {
        const filename = `${id}_styles_${index}`;
        return compileStyle({
          filename,
          id,
          scoped: style.scoped,
          source: style.content,
          trim: true,
          isProd,
        }).code;
      }),
    );
    component.styles = styleContents.join('\n');
  } else {
    component.styles = '';
  }

  component.id = id;

  return component;
};
