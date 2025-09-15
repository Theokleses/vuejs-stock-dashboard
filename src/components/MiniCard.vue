<!-- <template>
  <div class="mini-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MiniCard",
};
</script>

<style scoped>
.mini-card {
  background: #011F35;
  border-radius: 16px;
  padding: 12px;
  color: white;
  text-align: center;
  min-width: 181px;
  height: 143px;
  display: flex;
  align-items: start;
  gap: 8px;
}

</style> -->


<template>
  <div class="mini-card">
    <div class="card-title">
      <img class="icons" :src="logo" :alt="name" />
      <span>{{ name }}</span>
    </div>
    <p>Revenue {{ quarter }} {{ year }}</p>
    <h2>{{ revenue }} B</h2>
    <!-- <div class="change">
      <span :class="{ positive: changeAbs > 0, negative: changeAbs < 0 }">
        {{ changeAbs > 0 ? "+" : "" }}{{ changeAbs }}
      </span>
      <span :class="{ positive: changePct > 0, negative: changePct < 0 }">
        ({{ changePct > 0 ? "+" : "" }}{{ changePct }}%)
      </span>
    </div> -->
    <div class="change">
  <span :class="{ positive: changeAbs > 0, negative: changeAbs < 0 }">
    {{ changeAbs > 0 ? "▲ +" : "▼ " }}{{ changeAbs }}
  </span>
  <span :class="{ positive: changePct > 0, negative: changePct < 0 }">
    ({{ changePct > 0 ? "+" : "" }}{{ changePct }}%)
  </span>
</div>
    <small>In Bill USD</small>
  </div>
</template>

<script>
export default {
  name: "MiniCard",
  props: {
    name: String,
    logo: String,
    revenue: Number,
    changeAbs: Number,
    changePct: Number,
    quarter: String,
    year: Number
  }
};
</script>

<style scoped>
.mini-card {
  background: #011F35;
  border-radius: 16px;
  padding: 12px;
  color: white;
  text-align: center;
  width: 200px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  min-width: 181px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}
h2 {
  margin: 0;
  font-size: 22px;
}
.change {
  font-weight: bold;
}
.positive {
  color: #00ff99;
}
.negative {
  color: #ff4d4d;
}
</style>
