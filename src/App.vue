<template>
  <NewLearn v-if="$store.state.newLearn.show" />

  <main>
    <h1 class="title">My Tricklist</h1>
    <div class="seperator"></div>
    <h2>Working On</h2>
    <button 
      class="add-trick" 
      @click="add = true"
    >Add Trick</button>

    <div class="tricks">
      <Trick 
        v-for="(trick, i) in $store.state.tricks" 
        :key="trick.id" 
        :trick="{ ...trick, i }" 
      />

      <Trick 
        v-if="add" 
        :add="true" 
        @hide="add = false"
      />
    </div>
  </main>
</template>

<script>
import NewLearn from "./views/NewLearn/NewLearn.vue";
import Trick from "./components/ATrick.vue";

export default {
  name: 'App',
  components: {
    NewLearn,
    Trick
  },
  data() {
    return {
      add: false
    }
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
  background: linear-gradient(to top, #12c2e9, #c471ed, #f64f59);
  display: flex;
  align-items: center;
  justify-content: center;
}

main {
  max-width: 750px;
  max-height: 850px;
  height: 100%;
  width: 100%;
  background-color: white;
  padding: calc(max(.8vw, 10px)) calc(max(1.2vw, 15px));
  border-radius: 10px;
  box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 750px) {
    border-radius: 0px;
    max-height: unset;
  }

  .title {
    font-weight: 800;
    font-size: 2.75rem;
  }

  .seperator {
    background-color: black;
    opacity: .2;
    width: 100%;
    height: 2px;
    margin: 10px 0;
  }

  h2 {
    padding-top: 5px;
    font-size: 1.9rem;
    display: inline;
    font-weight: 800;
  }

  .tricks {
    margin: 12px 16px 16px 16px;
  }

  .add-trick {
    background: #12c2e9;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    font-size: .91rem;
    font-weight: bold;
    color: white;
    float: right;
    position: relative;
    z-index: 1;
    transform: scale(.9);

    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      background: #12c2e9;
      opacity: .5;
      border-radius: 8px;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transition: transform .15s ease;
    }

    &:focus {
      outline: none;

      &::before {
        transform: scale(1.12, 1.3);
      }
    }
  }
}
</style>
