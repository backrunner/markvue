<template>
  <div class="markvue-container" ref="container"></div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, PropType, createApp, nextTick } from 'vue';
import * as Vue from 'vue';
import { parse, ParsedComponentWithId } from '../utils/parser';

interface ExtendedWindow extends Window {
  markVueModules?: {
    [key: string]: {
      getScript?: (context: Record<string, unknown>) => any;
      getTemplate?: (context: Record<string, unknown>) => any;
    };
  };
}

export default defineComponent({
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
  },
  setup(props) {
    const container = ref(null);

    const extendedWindow = window as ExtendedWindow;
    if (!extendedWindow.markVueModules) {
      extendedWindow.markVueModules = {};
    }

    const insertStyles = (component: ParsedComponentWithId) => {
      const styleTag = document.createElement('style');
      styleTag.innerHTML = component.styles;
      styleTag.id = `markvue-styles-${component.id}`;
      document.head.appendChild(styleTag);
    };

    const compose = (component: ParsedComponentWithId) => {
      if (!extendedWindow.markVueModules![component.id]) {
        extendedWindow.markVueModules![component.id] = {};
      }
      eval(component.script);
      eval(component.template);
      const scriptRet = extendedWindow.markVueModules![component.id]?.getScript?.(props.context) || null;
      const render = extendedWindow.markVueModules![component.id]?.getTemplate?.(props.context) || null;
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
      const { parsedContent, components } = await parse(props.content);
      // insert markdown dom
      const containerEl = container.value as HTMLElement;
      containerEl.innerHTML = parsedContent;
      // render components
      components.forEach(async (component) => {
        // insert styles
        insertStyles(component);
        // run vue components
        createApp(compose(component)).mount(`#markvue-${component.id}`);
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
