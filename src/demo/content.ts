export const demoContent = `
# Title

## Subtitle

Here's some content and the following is a vue sfc.

<vue-sfc>
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
  padding: 6px 12px;
  background: #41aeff;
  color: #fff;
  font-weight: 600;
  border-radius: 6px;
}
</style>
</vue-sfc>

<vue-sfc>
<template>
  <div class="sfc-test">
    <span>second sfc</span>
  </div>
</template>
</vue-sfc>

Here's a vue component stub.

<vue-comp name="stubTest" />
`;
