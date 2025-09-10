<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default{
  name: "BaseCard",
}
</script>

<style scoped>
.card {
  background-color: #023A6233;
  border-radius: 16px;
  padding: 24px 32px;
  max-width: 1350px;
  position: relative
}
</style>
