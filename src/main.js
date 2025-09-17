// import { createApp } from 'vue'
// import App from './App.vue'
// import { VueEcharts } from 'vue-echarts'
// import 'echarts'

// const app = createApp(App)
// app.component('v-chart', VueEcharts)

// createApp(App).mount('#app')

import { createApp } from "vue";
import App from "./App.vue";

// ECharts
import ECharts from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, PieChart, BarChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent} from "echarts/components";

// Registriere die benötigten Komponenten
use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, PieChart, BarChart]);

const app = createApp(App);

// Registriere <v-chart> global
app.component("v-chart", ECharts);

app.mount("#app");

