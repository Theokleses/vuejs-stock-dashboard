<template>
  <div class="gross-margin-chart">
    <h2 class="chart-title">Gross Margin in % LQ</h2>
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { grossMarginData } from "@/services/grossMarginData";

export default defineComponent({
  name: "GrossMarginChart",
  setup() {
    const colors = {
      Meta: "#39DAFF",
      Tesla: "#31BFE2",
      Nvidia: "#29A5C5",
      Microsoft: "#218AA8",
      Apple: "#196F8C",
      Google: "#11546F",
      Amazon: "#093A52",
    };

    // Nur das letzte Quartal pro Firma nehmen
    const latestData = grossMarginData.map((d) => ({
      company: d.company,
      value: d.values[d.values.length - 1],
      quarter: d.quarters[d.quarters.length - 1],
      color: colors[d.company],
    }));

    // Nach Wert sortieren (höchste zuerst)
    latestData.sort((a, b) => a.value - b.value);

    const chartOption = {
      backgroundColor: "#011F35",
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          return `
            ${params.marker} <b>${params.name}</b><br/>
            Gross Margin: ${params.value.toFixed(1)}%<br/>
            Quarter: ${params.data.quarter}
          `;
        },
      },
      grid: { left: "17%", right: "5%", top: "5%", bottom: "5%" },
      xAxis: {
        type: "value",
        axisLabel: { show: false }, 
        splitLine: { show: true, lineStyle: { color: "#fff", width: 1 } },
      },
      yAxis: {
        type: "category",
        data: latestData.map((d) => d.company),
        axisLabel: { color: "#fff" },
        splitLine: { show: true, lineStyle: { color: "#fff", width: 1 } },
      },
      series: [
        {
          name: "Gross Margin",
          type: "bar",
          data: latestData.map((d) => ({
            value: Number(d.value.toFixed(2)),
            name: d.company,
            quarter: d.quarter,
            itemStyle: { color: d.color, borderColor: "#fff", borderWidth: 2 },
          })),
          label: {
            show: true,
            position: "right",
            color: "#fff",
            fontWeight: "bold",
            formatter: ({ value }) => `${value.toFixed(1)}%`,
          },
          barWidth: 28,
        },
      ],
    };

    return { chartOption };
  },
});

</script>

<style scoped>
.gross-margin-chart {
  background: #011f35;
  border-radius: 16px;
  padding: 20px;
  margin-top: 30px;
  color: white;
  width: 20%;
}
.chart {
  height: 400px;
  width: 100%;
}
</style>
