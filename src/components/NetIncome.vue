<template>
  <div class="net-income-chart">
    <h2 class="chart-title">Net Income TTM</h2>
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { netIncomeData } from "@/services/netIncomeData";

export default defineComponent({
  name: "NetIncomeChart",
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

    const order = ["Amazon", "Google", "Apple", "Microsoft", "Nvidia", "Tesla", "Meta"];
    const companies = order;
    const values = order.map((company) => {
      const entry = netIncomeData.find((d) => d.company === company);
      return entry ? Number(entry.values.reduce((a, b) => a + b, 0).toFixed(2)) : 0;
    });

    const chartOption = {
      backgroundColor: "#011F35",
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      grid: { left: "5%", right: "5%", bottom: "5%", top: "5%", containLabel: true },
      xAxis: {
        type: "value",
        axisLabel: { color: "#fff" },
        splitLine: { show: true, 
          lineStyle: { color: "#fff", width: 1} 
        },
        offset: 10,
      },
      yAxis: {
        type: "category",
        data: companies,
        axisLabel: { color: "#fff" },
        splitLine: { 
          show: true, 
          lineStyle: { color: "#fff", width: 1,},
          interval: 0
        },
        axisLine: {
          show: true,
          lineStyle: { color: "#fff", width: 1 }
        },
        axisTick: { show: true, alignWithLabel: true, length: 4}
      },
      series: [
        {
          name: "Net Income",
          type: "bar",
          data: companies.map((c, i) => ({
            value: Number(values[i].toFixed(2)),
            itemStyle: { 
              color: colors[c], 
              borderColor: "#fff", 
              borderWidth: 2,
            },
          })),
          label: {
            show: true,
            position: "right",
            color: "#fff",
            fontWeight: "bold",
            formatter: ({ value }) => value.toFixed(2)
          },
          barWidth: 28,
          barGap: '0%',
          barCategoryGap: '20%'
        },
      ],
    };

    return { chartOption };
  },
});
</script>

<style scoped>
.net-income-chart {
  background: #011f35;
  border-radius: 16px;
  padding: 20px;
  margin-top: 30px;
  margin-left: 20px;
  color: white;
  width: 40%;
}
.chart {
  height: 400px;
  width: 600px;
}
</style>