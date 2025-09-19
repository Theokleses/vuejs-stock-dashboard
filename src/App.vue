<template>
  <div class="title">
    <div class="tcolor"></div>
    <h1>The Magnificent Seven Companies</h1>
  </div>
  <div class="widget">
    <BaseCard>
      <img v-show="canScrollLeft" src="@/assets/icons/arrow-right.png" @click="scrollLeft" class="l-arrow"/>
      <div class="mini-cards" ref="cardsContainer">
        <!-- <MiniCard v-for="company in companies" :key="company.name">
          <div class="card-title">
            <img class="icons" :src="company.logo" :alt="company.name" />
            <span>{{ company.name }}</span>
          </div>
        </MiniCard> -->
        <MiniCard
  v-for="company in companies"
  :key="company.name"
  :name="company.name"
  :logo="company.logo"
  :revenue="company.revenue"
  :changeAbs="company.changeAbs"
  :changePct="company.changePct"
  :quarter="company.quarter"
  :year="company.year"
/>

      </div>
      <img v-show="canScrollRight" src="@/assets/icons/arrow-right.png" @click="scrollRight" class="r-arrow"/>
    </BaseCard>
  </div>
  <div class="first-section">
  <RevenueChart />
  <RevenueBreakdown />
  </div>
  <div class="second-section">
  <NetIncome />
  <GrossMargin />
  </div>
  <RevenueGrowth />
</template>

<script>
import BaseCard from "./components/BaseCard.vue";
import MiniCard from "./components/MiniCard.vue";
import RevenueChart from "./components/RevenueChart.vue";
import RevenueBreakdown from "./components/RevenueBreakdown.vue";
import NetIncome from "./components/NetIncome.vue";
import GrossMargin from "./components/GrossMargin.vue";
import RevenueGrowth from "./components/RevenueGrowth.vue";
import { stockService } from "@/services/stockService";
import { mockCompanies } from "@/services/mockCompanies";


export default {
  name: "App",
  components: { BaseCard, MiniCard, RevenueChart, RevenueBreakdown, NetIncome, GrossMargin, RevenueGrowth },

  data() {
    return {
      // companies: [
      //   { name: "Apple", logo: require("@/assets/icons/apple.png") },
      //   { name: "Microsoft", logo: require("@/assets/icons/microsoft.png") },
      //   { name: "Nvidia", logo: require("@/assets/icons/nvidia.png") },
      //   { name: "Google", logo: require("@/assets/icons/google.png") },
      //   { name: "Amazon", logo: require("@/assets/icons/amazon.png") },
      //   { name: "Meta", logo: require("@/assets/icons/meta.png") },
      //   { name: "Tsla", logo: require("@/assets/icons/tesla.png") },
      // ],
      companies: mockCompanies,
      data: null,
      canScrollLeft: false,
      canScrollRight: true
    };
  },

  async created() {
    this.data = await stockService.getRevenue("$AAPL");
    console.log("Loaded data", this.data);
  },

//   async created() {
//   const data = await stockService.getRevenue("$AAPL");
//   this.lastRevenue = data[data.length - 1]; 
//   console.log("Revenue:", this.lastRevenue);
// },

  mounted() {
    this.$refs.cardsContainer.addEventListener("scroll", this.checkScroll);
    this.checkScroll();
  },

  beforeUnmount() {
    this.$refs.cardsContainer.removeEventListener("scroll", this.checkScroll);
  },

  methods: {
    scrollRight() {
      this.$refs.cardsContainer.scrollBy({ left: 200, behavior: "smooth" });
    },
    scrollLeft() {
      this.$refs.cardsContainer.scrollBy({ left: -200, behavior: "smooth" });
    },
    checkScroll() {
      const container = this.$refs.cardsContainer;
      this.canScrollLeft = container.scrollLeft > 0;
      this.canScrollRight = container.scrollLeft + container.clientWidth < container.scrollWidth;
    }
  },
};
</script>

<style>
body {
  margin: 0;
}

h1 {
  color: white;
  font-weight: 500;
}

#app {
  background: radial-gradient(71.1% 100% at 50% 0%,#020204 14.6%,#011f35 100%);
  min-height: 100vh;
  /* padding: 30px 80px; */
  box-sizing: border-box;
  font-family: Rubik;
}

.title {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 50px;
}

.widget {
  padding: 30px 80px;
}

.tcolor {
  background-color: #39daff;
  width: 80px;
  height: 30px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.mini-cards {
  display: flex;
  flex-wrap: nowrap; 
  gap: 24px;
  align-items: center;
  overflow-x: hidden; 
  scroll-behavior: smooth; 
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* .icons {
  height: 24px;
  width: 24px;
} */

.r-arrow {
  position: absolute;
  top: 50%;          
  right: 16px;       
  transform: translateY(-50%);
  cursor: pointer;
  width: 32px;
  height: 32px;
}

.l-arrow {
  position: absolute;
  top: 50%;                
  left: 16px;
  transform: translateY(-50%) rotate(180deg); 
  cursor: pointer;
  width: 32px;
  height: 32px;
}

.first-section {
  display: flex;
  gap: 50px;
  padding-left: 20px;
  padding-right: 20px;
}

.second-section {
  display: flex;
  gap: 30px;
}

</style>
