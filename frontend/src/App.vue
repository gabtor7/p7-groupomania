<template>
  <MainHeader />
  <div class="components-container mt-2 px-3 py-5">
    <div class="login-module">
      <LoginPage />
    </div>
    <HomePage />
    <UserProfile />
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import LoginPage from './components/LoginPage.vue';
import HomePage from './components/HomePage.vue';
import UserProfile from './components/UserProfile.vue';

export default {
  name: 'App',
  components: {
    MainHeader, LoginPage, HomePage, UserProfile
  }
}
</script>

<style>

:root{
  --primary-color: #fd2d01;
  --secondary-color: #ffd7d7;
  --tertiary-color: #4e5166;
}

body{
  background-color: #fafafa;
}

a{
  color: var(--primary-color);
}

a:hover{
  color: var(--primary-color);
  text-decoration: underline;
}

.btn-primary{
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  padding: 5px 10px;
  border-radius: 6px
}

.btn-primary:hover{
  border-color: var(--primary-color);
  background-color: var(--secondary-color);
  color: var(--primary-color)
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.components-container{
  max-width: 1280px;
  background-color: #fff;;
  margin: auto;
  border-width:0px 2px 0px 2px;
  border-color: black;
  box-shadow: 0px 0px 5px;
}


.login-module{
  text-align: center;
}
</style>
