export const demoContent = `
# Title

## Subtitle

Here's some content.

Next is a Vue SFC (counter).

<vue-sfc class="sfc-test">
<template>
  <div class="sfc-test">
    <button @click="count++">{{ count }}</button>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>
<style scoped>
button {
  padding: 6px 18px;
  background: #41aeff;
  color: #fff;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
</style>
</vue-sfc>
`;
