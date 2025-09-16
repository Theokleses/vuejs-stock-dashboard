<template>
  <div class="revenue-pie-chart">
    <h2 class="chart-title">Revenue Breakdown Magnificent Seven</h2>
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import VChart from "vue-echarts";
import { revenueData } from "@/services/revenueData";

export default defineComponent({
  name: "RevenuePieChart",
  components: { VChart },
  setup() {
    // Farben wie in deinem Linienchart
    const colors = {
      Meta: "#39DAFF",
      Tesla: "#31BFE2",
      Nvidia: "#29A5C5",
      Microsoft: "#218AA8",
      Apple: "#196F8C",
      Google: "#11546F",
      Amazon: "#093A52",
    };

    // Hilfsfunktion: TTM Umsatz (Summe der letzten 4 Quartale)
    const calcTTM = (key) => {
      const values = revenueData.map((d) => d[key]);
      return values.slice(-4).reduce((a, b) => a + b, 0);
    };

    const getLatestValue = (key) => {
      const values = revenueData.map((d) => d[key]);
      return values.at(-1) ?? null;
    };

    // Firmendaten für Pie Chart
    const companies = [
      "Meta",
      "Tesla",
      "Nvidia",
      "Microsoft",
      "Apple",
      "Google",
      "Amazon",
    ];
    const pieData = companies.map((c) => ({
      name: c,
      value: calcTTM(c),
      itemStyle: { color: colors[c] },
    }));

    // Neuester Quartalsname (für Tooltip)
    const latestQuarter = revenueData[revenueData.length - 1].quarter;

    const chartOption = {
      // backgroundColor: "#011F35",
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          return `
            <b>${params.name}</b><br/>
            TTM Revenue: ${params.value.toFixed(1)} B USD<br/>
            Latest Quarter: ${latestQuarter}
          `;
        },
      },
      legend: {
        orient: "vertical",
        right: "20%",
        top: "middle",
        // textStyle: { color: "#fff", fontSize: 13 },
        itemWidth: 36,
        itemHeight: 18,
        itemGap: 14,
        icon: "rect",
        formatter: function (name) {
          const latestValues = {
            Meta: getLatestValue("Meta"),
            Tesla: getLatestValue("Tesla"),
            Nvidia: getLatestValue("Nvidia"),
            Microsoft: getLatestValue("Microsoft"),
            Apple: getLatestValue("Apple"),
            Google: getLatestValue("Google"),
            Amazon: getLatestValue("Amazon"),
          };
          const value =
            latestValues[name] !== null ? latestValues[name].toFixed(1) : "-";
          return `{name|${name}}  {value|${value}}`;
        },
        textStyle: {
          color: "#fff",
          fontSize: 13,
          padding: [3, 0, 0, 0],
          rich: {
            value: {
              color: "#bfeafc",
              fontWeight: "bold",
              padding: [0, 0, 0, 0],
            },
          },
        },
      },
      series: [
        {
          name: "TTM Revenue",
          type: "pie",
          radius: ["80%", "45%"],
          center: ["28%", "50%"],
          avoidLabelOverlap: false,
          label: { show: false, position: "center" },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
              color: "#fff",
            },
          },
          labelLine: { show: false },
          itemStyle: { borderColor: "#fff", borderWidth: 2 },
          data: pieData,
        },
      ],
    };

    return { chartOption };
  },
});
</script>

<style scoped>
.revenue-pie-chart {
  background: #011f35;
  border-radius: 16px;
  padding: 20px;
  color: white;
  width: 40%;
}
.chart {
  /* left: -100px; */
  height: 400px;
  width: 100%;
}
</style>
