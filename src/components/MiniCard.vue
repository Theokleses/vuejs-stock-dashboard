<template>
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

</style>
