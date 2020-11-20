<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout"; // Возвращаем нужный layout, который оборачивает router-view, с помощью специального тега components
    },
  },
  components: {
    EmptyLayout,
    MainLayout,
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
