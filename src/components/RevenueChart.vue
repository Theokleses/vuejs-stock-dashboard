<template>
  <div class="revenue-chart">
    <h2 class="chart-title">Revenue last 3 years</h2>
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import VChart from "vue-echarts";
import { revenueData } from "@/services/revenueData";

export default defineComponent({
  name: "RevenueChart",
  components: { VChart },
  setup() {
    // Hilfsfunktion um den letzten Wert jeder Serie zu finden
    const getLatestValue = (dataKey) => {
      const values = revenueData.map(d => d[dataKey]);
      return values.length > 0 ? values[values.length - 1] : null;
    };

    const chartOption = {
      backgroundColor: "#011F35",
      grid: { left: '5%', right: '20%', bottom: '5%', top: '5%', containLabel: true},
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "line" },
      },
      legend: {
        orient: "vertical",
        right: "3%",
        top: "21%",
        itemWidth: 36,
        itemHeight: 18,
        itemGap: 18,
        icon: "rect",
        formatter: function (name) {
          const latestValues = {
            'Meta': getLatestValue('Meta'),
            'Tesla': getLatestValue('Tesla'),
            'Nvidia': getLatestValue('Nvidia'),
            'Microsoft': getLatestValue('Microsoft'),
            'Apple': getLatestValue('Apple'),
            'Google': getLatestValue('Google'),
            'Amazon': getLatestValue('Amazon')
          };
          const value = latestValues[name] !== null ? latestValues[name].toFixed(1) : '-';
          return `${name}  {value|${value}}`;
        },
        textStyle: { 
          color: "#fff", 
          fontSize: 13,
          padding: [3, 0, 0, 0],
          rich: {
            value: {
              color: '#bfeafc',
              fontWeight: 'bold',
              padding: [0, 0, 0, 0] 
            }
          }
        },
        itemStyle: { borderColor: "#fff", borderWidth: 2 }    
      },
      xAxis: {
        type: "category",
        data: revenueData.map((d) => d.quarter),
        boundaryGap: false,
        axisLabel: { color: "#fff", rotate: 45, margin: 20 },
        axisLine: { lineStyle: { color: "#fff", width: 1} },
        offset: 10,
        splitLine: { show: true, lineStyle: { color: "#fff", width: 1}}
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#fff" },
        splitLine: { lineStyle: { color: "#fff" , width: 1} },
      },
      series: [
        {
          name: "Meta",
          type: "line",
          data: revenueData.map((d) => d.Meta),
          smooth: false,
          lineStyle: { color: "#39DAFF", width: 3, borderWidth: 2, shadowBlur: 10, shadowColor: "#00E5FF",},
          itemStyle: { color: "#39DAFF" },
          showSymbol: true,
          animationDuration: 2000,
        },
        {
          name: "Tesla",
          type: "line",
          data: revenueData.map((d) => d.Tesla),
          smooth: false,
          lineStyle: { color: "#31BFE2", width: 3, borderWidth: 2, shadowBlur: 10, shadowColor: "#00E5FF",},
          itemStyle: { color: "#31BFE2" },
          showSymbol: true,
          animationDuration: 2000,
        },
        {
          name: "Nvidia",
          type: "line",
          data: revenueData.map((d) => d.Nvidia),
          smooth: false,
          lineStyle: { color: "#29A5C5", width: 3, borderWidth: 2, shadowBlur: 10, shadowColor: "#00E5FF",},
          itemStyle: { color: "#29A5C5" },
          showSymbol: true,
          animationDuration: 2000,
        },
        {
          name: "Microsoft",
          type: "line",
          data: revenueData.map((d) => d.Microsoft),
          smooth: false,
          lineStyle: { color: "#218AA8", width: 3, borderWidth: 2, shadowBlur: 10, shadowColor: "#00E5FF"},
          itemStyle: { color: "#218AA8" },
          showSymbol: true,
          animationDuration: 2000,
        },
        {
          name: "Apple",
          type: "line",
          data: revenueData.map((d) => d.Apple),
          smooth: false,
          lineStyle: { color: "#196F8C", width: 3, borderWidth: 2, shadowBlur: 10, shadowColor: "#00E5FF"},
          showSymbol: true,
          itemStyle: { color: "#196F8C" },
          animationDuration: 2000,
        },
        {
          name: "Google",
          type: "line",
          data: revenueData.map((d) => d.Google),
          smooth: false,
          lineStyle: { color: "#11546F", width: 3, borderWidth: 2, shadowBlur: 10, shadowColor: "#00E5FF"},
          itemStyle: { color: "#11546F" },
          showSymbol: true,
          animationDuration: 2000,
        },
        {
          name: "Amazon",
          type: "line",
          data: revenueData.map((d) => d.Amazon),
          smooth: false,
          lineStyle: { color: "#093A52", width: 3, borderWidth: 2, shadowBlur: 10, shadowColor: "#00E5FF"},
          itemStyle: { color: "#093A52" },
          showSymbol: true,
          animationDuration: 2000,
        },
      ],
    };
    return { chartOption };
  },
});
</script>

<style scoped>
.revenue-chart {
  background: #011f35;
  border-radius: 16px;
  padding: 20px;
  color: white;
}
.chart-title {
  text-align: left;
  margin-bottom: 16px;
  font-weight: bold;
}
.chart {
  left: -50px;
  width: 1000px;
  height:500px;
}
</style>
