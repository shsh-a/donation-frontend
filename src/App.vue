<template>
  <div id="app">
      <div id="logo">
          <img alt="Vue logo" src="./assets/logo.png">
      </div>
    <page msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import page from './components/page.vue'

export default {
  name: 'App',
  components: {
    page
  }
}
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#logo{
    text-align: center;

}
</style>
