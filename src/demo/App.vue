<template>
  <div class="markvue">
    <markvue :content="demoContent" :context="context" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import markvue from '../components/markvue.vue';
import { demoContent } from './content';
import stubTest from './stubTest.vue';

export default defineComponent({
  components: { markvue, stubTest },
  setup() {
    return {
      demoContent,
      context: {
        stubTest,
      },
    };
  },
});
</script>
