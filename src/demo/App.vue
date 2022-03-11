<template>
  <div class="container">
    <div class="title">
      <div class="banner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="1308"
          height="210"
          viewBox="0 0 1308 210"
        >
          <defs>
            <filter id="filter" x="743" y="55" width="574" height="108" filterUnits="userSpaceOnUse">
              <feOffset result="offset" dx="4" dy="6.928" in="SourceAlpha" />
              <feGaussianBlur result="blur" stdDeviation="2" />
              <feFlood result="flood" flood-color="#868686" flood-opacity="0.03" />
              <feComposite result="composite" operator="in" in2="blur" />
              <feBlend result="blend" in="SourceGraphic" />
            </filter>
          </defs>
          <rect id="矩形_1" data-name="矩形 1" class="cls-1" width="655" height="210" rx="30" ry="30" />
          <rect
            id="矩形_2"
            data-name="矩形 2"
            class="cls-2"
            x="420.5"
            y="39"
            width="201"
            height="131"
            rx="12"
            ry="12"
          />
          <text id="_" data-name="+" class="cls-3" x="331.866" y="141.097"><tspan x="331.866">+</tspan></text>
          <image
            id="Vue"
            x="480"
            y="72"
            width="82"
            height="70"
            xlink:href="data:img/png;base64,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"
          />
          <image
            id="markdown"
            x="37"
            y="40"
            width="210"
            height="129"
            xlink:href="data:img/png;base64,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"
          />
          <g style="fill: #1c1c1c; filter: url(#filter)">
            <text
              id="MarkVue"
              class="cls-4"
              x="1024.73"
              y="151.131"
              style="stroke: inherit; filter: none; fill: inherit"
            >
              <tspan x="1024.73">MarkVue</tspan>
            </text>
          </g>
          <use xlink:href="#MarkVue" style="stroke: #000; filter: none; fill: none" />
        </svg>
      </div>
      <a class="github" href="https://github.com/backrunner/markvue" target="blank">
        <svg
          t="1646977192063"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6768"
          width="200"
          height="200"
        >
          <path
            d="M0 524.992q0 166.016 95.488 298.496t247.488 185.504q6.016 0.992 10.016 0.992t6.496-1.504 4-3.008 2.016-4.992 0.512-4.992v-100.512q-36.992 4-66.016-0.512t-45.504-14.016-28.992-23.488-16.992-25.504-8.992-24-5.504-14.496q-8.992-15.008-27.008-27.488t-27.008-20-2.016-14.496q50.016-26.016 112.992 66.016 34.016 51.008 119.008 30.016 10.016-40.992 40-70.016Q293.984 736 237.984 670.976t-56-158.016q0-87.008 55.008-151.008-22.016-64.992 6.016-136.992 28.992-2.016 64.992 11.488t50.496 23.008 25.504 17.504q56.992-16 128.512-16t129.504 16q12.992-8.992 28.992-19.008t48.992-21.504 60.992-9.504q27.008 71.008 7.008 135.008 56 64 56 151.008 0 92.992-56.992 158.496t-172 85.504q43.008 43.008 43.008 104v128.992q0 0.992 0.992 3.008 0 6.016 0.512 8.992t4.512 6.016 12 3.008q152.992-52 250.496-185.504t97.504-300.512q0-104-40.512-199.008t-108.992-163.488-163.488-108.992T512.032 12.96 313.024 53.472 149.536 162.464t-108.992 163.488-40.512 199.008z"
            p-id="6769"
            fill="#ffffff"
          ></path>
        </svg>
        <span>Star on GitHub</span>
      </a>
    </div>
    <div class="content">
      <div class="section-title">Demo</div>
      <div class="demo">
        <div class="source">
          <p class="tag">Source</p>
          <pre><code>{{ demoContent }}</code></pre>
        </div>
        <div class="rendered">
          <p class="tag">Rendered</p>
          <markvue :content="demoContent" :context="context" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import markvue from '../components/markvue.vue';
import { demoContent } from './content';

export default defineComponent({
  components: { markvue },
  setup() {
    onMounted(() => {
      (window as any).hljs.highlightAll();
    });
    return {
      demoContent,
    };
  },
});
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  position: relative;
  max-width: 100vw;
  overflow-x: hidden;
  font-size: 16px;
  scroll-behavior: smooth;
}

.title {
  width: 100%;
  margin-top: 2rem;
}
.title > .banner {
  width: 40rem;
  user-select: none;
  position: relative;
  margin: 0 auto;
}
.title > .banner > svg {
  width: 100%;
  height: 100%;
}

.github {
  width: max-content;
  height: max-content;
  box-sizing: border-box;
  padding: 1rem 2.5rem;
  background: #1c1c1c;
  border-radius: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  letter-spacing: 0.05rem;
  color: #e9e9e9;
  margin: 2rem auto;
  user-select: none;
  cursor: pointer;
  transition: 100ms ease;
  text-decoration: none;
}

.github:hover {
  background: #3e3e3e;
}

.github > svg {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
}

.content {
  background: #fafafa;
  box-sizing: border-box;
  padding: 1.875rem 2.5rem;
  max-width: 1200px;
  margin: 0 auto 3.75rem auto;
  border-radius: 2rem;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
}

.demo {
  margin: 0 auto;
  display: flex;
  padding: 0.25rem 0;
  box-sizing: border-box;
}

.tag {
  background: #4e4e4e;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  margin: 0.625rem 0 0.5rem 0.75rem;
  border-radius: 1rem;
  width: max-content;
  box-shadow: 2px 2px 4px rgba(0, 5, 7, 0.075);
}

.source {
  margin-right: 4rem;
  background: #fff;
  box-sizing: border-box;
  flex: 1;
  border-radius: 1rem;
  box-shadow: 2px 2px 16px rgba(0, 12, 15, 0.05);
}

.source > pre > code {
  background: #fff;
  padding: 0 1.5rem;
  font-size: 15px;
}

.rendered {
  background: #fff;
  box-sizing: border-box;
  border-radius: 1rem;
  flex: 1;
  box-shadow: 2px 2px 16px rgba(0, 12, 15, 0.05);
}

.rendered > .markvue-container {
  padding: 0 1.5rem;
}

.cls-1,
.cls-4 {
  fill: #1c1c1c;
}

.cls-2 {
  fill: #f2f2f2;
}

.cls-3 {
  font-size: 96.012px;
  fill: #e9e9e9;
}

.cls-3,
.cls-4 {
  text-anchor: middle;
  font-family: 'UD Digi Kyokasho NP-B';
  font-weight: 700;
}

.cls-4 {
  stroke: #000;
  stroke-linejoin: round;
  stroke-width: 1px;
  font-size: 122.682px;
  filter: url(#filter);
}
</style>