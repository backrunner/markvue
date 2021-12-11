# MarkVue

Allows you to mix Vue component or Vue SFC into Markdown, inspired by `@vue/sfc-playground`.

## How to use

1: Install the package:

```bash
npm install markvue --save
```

2: Import it to your project:

```js
import MarkVue from 'markvue';
import { createApp } from 'vue';
import App from './app.vue';

const app = createApp(App);
app.use(MarkVue);

app.mount('#app');
```

Our component only support Vue 3, Vue 2 is not supported.

3: Use it in your pages:

```vue
<template>
  <MarkVue :content="content" />
</template>

<script>
import { defineComponent } from 'vue';

const content = `
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

<vue-comp component="stubTest" />
`
export default defineComponent({
  setup() {
    return {
      content,
    };
  },
});
</script>
```

For Vue SFC, MarkVue will inject Vue into the SFC as `context`, you can import APIs from Vue directly.

If you want to import something from other package, be sure to put it in the `context`, and bind it to MarkVue, just like this:

```vue
<template>
  <MarkVue :content="content" :context="context" />
</template>

<script setup>
import SOMETHING from 'SOME_PACKAGE';

return {
  content: `
  <vue-sfc>
  <template>
    <div>{{ content }}</div>
  </template>
  <script setup>
  import { SOME_METHOD } from 'SOME_PACKAGE';

  return {
    content: SOME_METHOD(),
  };
  </script>
  </vue-sfc>
  `,
  context: {
    SOME_PACKAGE: SOMETHING,
  },
};
</script>
```

You can also put a Vue component into `context` directly, you can mix it into your Markdown like this:

```markdown
# Title

content

<vue-comp component="myComponent" />
```

```vue
<template>
  <MarkVue :context="context">
</template>

<script setup>
import myComponent from './myComponent.vue';

return {
  context: {
    myComponent,
  },
};
</script>
```

If you want to add `class` or some other attribute in the root element of Vue SFC or Vue component, you can just add it to the `<vue-sfc>` or `<vue-comp>` tag, like this:

```Markdown
<vue-comp class="my-vue-comp" />

or

<vue-sfc class="my-vue-sfc">
</vue-sfc>
```

## Features

Supported SFC Features:

- `<script setup>`

- Scoped styles

Unsupported SFC Features:

- TypeScript

- Style Preprocessors

- Babel transform (The script which your wrote in the SFC will only be compiled by `@vue/compiler-sfc`, you need to ensure the compatibility by yourself)

## License

MIT
