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

:root{
  --primary-color: #fd2d01;
  --secondary-color: #ffd7d7;
  --tertiary-color: #4e5166;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
