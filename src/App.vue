<template>
<!-- <router-view></router-view> -->


  <!-- <router-view v-slot="{ Component, route }">
      <keep-alive>
      <component :is="Component" :key="route.name" />
    </keep-alive>
  </router-view> -->

<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component"></component>
  </keep-alive>
</router-view>

</template>

<script>
</script>

<style>
</style>
