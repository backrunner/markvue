<template>
  <div class="markvue-container" ref="container"></div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, PropType, createApp, nextTick, Component } from 'vue';
import * as Vue from 'vue';
import { parse, ParsedComponentWithId } from '../utils/parser';
import type { marked } from 'marked';

interface ExtendedWindow extends Window {
  markVueModules?: {
    [key: string]: {
      getScript?: (context: Record<string, unknown>) => any;
      getTemplate?: (context: Record<string, unknown>) => any;
    };
  };
}

export default defineComponent({
  name: 'MarkVue',
  props: {
    content: {
      type: String,
      default: '',
      required: true,
    },
    context: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({
        vue: Vue,
      }),
    },
    markedOptions: {
      type: Object as PropType<marked.MarkedOptions | undefined>,
      required: false,
      default: undefined,
    },
  },
  setup(props) {
    const container = ref(null);
    const context = props.context;

    if (!context.vue) {
      context.vue = Vue;
    }

    const extendedWindow = window as ExtendedWindow;
    if (!extendedWindow.markVueModules) {
      extendedWindow.markVueModules = {};
    }

    const insertStyles = (component: ParsedComponentWithId) => {
      const styleTag = document.createElement('style');
      styleTag.innerHTML = component.styles!;
      styleTag.id = `markvue-styles-${component.id}`;
      document.head.appendChild(styleTag);
    };

    const compose = (component: ParsedComponentWithId) => {
      if (!extendedWindow.markVueModules![component.id]) {
        extendedWindow.markVueModules![component.id] = {};
      }
      eval(component.script!);
      eval(component.template!);
      const scriptRet = extendedWindow.markVueModules![component.id]?.getScript?.(context) || null;
      const render = extendedWindow.markVueModules![component.id]?.getTemplate?.(context) || null;
      return {
        __scopeId: `data-v-${component.id}`,
        ...scriptRet,
        render,
      };
    };

    // define render function
    const renderContent = async () => {
      if (!container.value) {
        console.warn('[Markvue] Cannot access the container element.');
        return;
      }
      const { parsedContent, components } = await parse(props.content, {
        marked: props.markedOptions,
      });
      // insert markdown dom
      const containerEl = container.value as HTMLElement;
      containerEl.innerHTML = parsedContent;
      // render components
      components.forEach(async (component) => {
        if (component.type === 'sfc') {
          // insert styles
          insertStyles(component);
          // run vue components
          createApp(compose(component)).mount(`#markvue-${component.id}`);
        } else {
          if (!context[component.name!]) {
            console.warn('[Markvue] No matched component in context.');
            return;
          }
          createApp(context[component.name!] as Component).mount(`#markvue-${component.id}`);
        }
      });
    };

    onMounted(() => {
      nextTick(() => {
        renderContent();
      });
    });

    return {
      container,
    };
  },
});
</script>
