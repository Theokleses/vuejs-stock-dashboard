<template>
  <div class="revenue-growth-chart">
    <h2 class="chart-title">Revenue Growth in % (YoY)</h2>
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { revenueGrowthData } from "@/services/revenueGrowthData";

export default defineComponent({
  name: "RevenueGrowthChart",
  setup() {
    const colors = ["#39DAFF", "#31BFE2", "#29A5C5", "#218AA8"]; // hell -> dunkel

    const companies = [
      "Meta",
      "Tesla",
      "Nvidia",
      "Microsoft",
      "Apple",
      "Google",
      "Amazon",
    ];

    const quarters = [...revenueGrowthData[0].quarters].reverse();

    const chartOption = {
      backgroundColor: "#011F35",
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          return `
            <span style="display:inline-block;margin-right:5px;
            border-radius:50%;width:10px;height:10px;
            background-color:${params.color};"></span>
            <b>${params.seriesName}</b><br/>
            Company: ${params.name}<br/>
            Growth: ${params.value.toFixed(1)}%<br/>
            Quarter: ${params.seriesName}
          `;
        },
      },
      legend: {
        orient: "vertical",
        right: "0%",
        top: "middle",
        padding: [0, 0, 0, 0], 
        itemWidth: 46,
        itemHeight: 18,
        itemGap: 14,
        icon:"rect",
        textStyle: { color: "#fff", fontWeight: "bold", padding: [0, 0, 0, 0]}
      },
      grid: { left: "1%", right: "10%", bottom: "5%", top: "15%", containLabel: true },
      xAxis: {
        type: "category",
        data: companies,
        axisLabel: { color: "#fff" },
        splitLine: { show: false, lineStyle: { color: "#fff" } },
        axisLine: { show: true, lineStyle: { color: "#fff" }},
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#fff", formatter: "{value}" },
        splitLine: { show: true, lineStyle: { color: "#fff" } },
        axisLine: { show: true, lineStyle: { color: "#fff" }},
      },
      series: quarters.map((q, i) => ({
        name: q,
        type: "bar",
        data: companies.map((c) => {
          const companyData = revenueGrowthData.find((d) => d.company === c);
          if (!companyData) return 0;
          return Number(companyData.values[i].toFixed(2));
        }),
        itemStyle: { color: colors[i], borderColor: "#fff", borderWidth: 2 },
        barWidth: 22,
        barGap: '0%',
      })),
    };

    return { chartOption };
  },
});
</script>

<style scoped>
.revenue-growth-chart {
  background: #011f35;
  border-radius: 16px;
  padding: 20px;
  color: white;
  width: 55%;
}
.chart {
  height: 500px;
  width: 100%;
}
</style>
