<template>
  <div class="markvue">
    <markvue :content="demoContent" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import markvue from '../components/markvue.vue';
import { demoContent } from './content';

export default defineComponent({
  components: { markvue },
  setup() {
    return {
      demoContent,
    };
  },
});
</script>
