<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>
<!--我的世界-->

<script>
import MainTabBar from "@/components/content/maintabbar/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar

  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
