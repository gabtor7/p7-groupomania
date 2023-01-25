<template>
  <MainHeader />
  <LoginPage />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import MainHeader from './components/MainHeader.vue';
import LoginPage from './components/LoginPage.vue';

export default {
  name: 'App',
  components: {
    MainHeader, LoginPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
