<template>
<div class="newlearn" :style="{ transform: leave ? 'translate(100vw)' : null }">
  <Tick />
  <h1 class="title nice">Nice job! 🎉</h1>
  <h2 class="title learnt">You just learnt</h2>
  <h2 class="title trick">{{ $store.state.newLearn.trick }}!</h2>
</div>
</template>

<script>
import Tick from "./components/TheTick.vue";

export default {
  name: 'NewLearn',
  components: {
    Tick
  },
  data() {
    return {
      leave: false
    }
  },
  mounted() {
    const delay = 3000;

    setTimeout(() => this.leave = true, delay)
    setTimeout(() => this.$store.commit("SET_NEW_LEARN", { show: false }), delay + 500)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&display=swap');

.newlearn {
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg);
  transition: transform .5s ease;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  border-radius: 10px;

  h1 {
    position: absolute;
    top: 12vh;
    font-size: calc(max(4.5vw, 3.8rem));
    transform: translate(70vw);
    animation: slide-in .6s ease forwards;
  }

  h2 {
    position: absolute;
    font-size: calc(max(4vw, 2.9rem));
    transform: translate(70vw);
    animation: slide-in .6s ease forwards;
  }

  @keyframes slide-in {
    to {
      transform: translate(0);
    }
  }

  .learnt {
    bottom: 18vh;
  }

  .trick {
    bottom: calc(18vh - max(4vw, 2.9rem) - 15px);
  }
}
</style>
