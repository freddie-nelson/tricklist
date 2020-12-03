<template>
  <NewLearn v-if="$store.state.showNewLearn" />
</template>

<script>
import NewLearn from "./views/NewLearn/NewLearn.vue";

export default {
  name: 'App',
  components: {
    NewLearn
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  font-family: "Source Sans Pro", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
