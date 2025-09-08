<template>
  <div >
    <BaseCard>
      <h2 style="color: white">Titel</h2>
      <p style="color: #ccc">Das ist Inhalt in der Card.</p>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from "./components/BaseCard.vue";

export default {
  name: "App",
  components: {
    BaseCard,
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  background: radial-gradient(71.1% 100% at 50% 0%,#020204 14.6%,#011f35 100%);
  width: 100vw;
  min-height: 100vh;
  padding: 100px;
  box-sizing: border-box;
}
</style>
