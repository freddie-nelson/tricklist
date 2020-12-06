<template>
  <main>
    <NewLearn v-if="$store.state.newLearn.show" />

    <h1 class="title">My Tricklist</h1>
    <div class="seperator"></div>
    <h2>Learning</h2>
    <button 
      class="add-trick" 
      @click="addTrick"
    >Add Trick</button>

    <div class="tricks">
      <Trick 
        v-for="(trick, i) in $store.state.tricks" 
        :key="trick.id" 
        :trick="{ ...trick, i }" 
      />

      <Trick 
        v-if="add || $store.state.tricks.length === 0" 
        :add="true" 
        @hide="add = false"
      />
    </div>

    <h2>Track Your Progress</h2>
    <v-calendar
      style="margin-top: 15px;"
      color="accent"
      is-expanded
      is-dark
      :attributes="attributes"
      :max-date="new Date()"
      @dayclick="dayClicked"
    />
    
    <div class="learns">
      <h2>You got {{ learns.length }} new learns on {{ currentDate ? currentDate.toLocaleDateString() : null }}</h2>
      <div class="learn header">
        <p>Trick Name</p>
        <p>Date Added</p>
        <p>Date Learnt</p>
      </div>
      <div class="seperator"></div>
      <div class="learn" v-for="(learn, i) in learns" :key="i">
        <p class="trick">{{ learn.text }}</p>
        <p>{{ new Date(learn.dateAdded).toLocaleDateString() }}</p>
        <p>{{ new Date(learn.dateCompleted).toLocaleDateString() }}</p>
      </div>
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
      add: false,
      learns: [],
      currentDate: null
    }
  },
  computed: {
    attributes() {
      const tricks = this.$store.state.learnt;

      const dates = tricks.map(trick => {
        return {
          highlight: true,
          key: trick.id,
          dates: new Date(trick.dateCompleted)
        }
      })

      return dates
    }
  },
  methods: {
    addTrick() {
      this.add = true;

      if (this.$store.state.tricks.length === 0) {
        document.getElementById("add-trick-input").focus();
      }
    },
    dayClicked ({ attributes, date }) {
      // find corresponding trick for each atrr on this day
      this.learns = attributes.map(attr => {
        return this.$store.state.learnt.find(ele => ele.id === attr.key);
      })

      this.currentDate = date;
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;1,700&display=swap');

// colors
:root {
  --text: #FFF;
  --bg: #1A202C;
  --accent: #8e2de2;
  --accent-2: #4a00e0;
  --tick-bg: #86E166;
  --tick-shadow-harsh: #86ff5b;
  --tick-shadow-soft: #94ff7033;
}

.vc-container {
  --accent-100: var(--accent) !important;
  --accent-200: var(--accent) !important;
  --accent-300: var(--accent) !important;
  --accent-400: var(--accent) !important;
  --accent-500: var(--accent-2) !important;
  --accent-600: var(--accent) !important;
  --accent-700: var(--accent) !important;
  --accent-800: var(--accent) !important;
  --accent-900: var(--accent) !important;
}

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
  color: var(--text);
}

#app {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, var(--accent), var(--accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
}

main {
  max-width: 750px;
  max-height: 850px;
  height: 100%;
  width: 100%;
  background-color: var(--bg);
  padding: calc(max(.8vw, 10px)) calc(max(1.2vw, 15px));
  border-radius: 10px;
  box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow-x: hidden;
  padding-bottom: 80px;

  &::-webkit-scrollbar {
    display: none
  }

  @media screen and (max-width: 750px) {
    border-radius: 0px;
    max-height: unset;

    .newlearn {
      border-radius: 0px;
    }
  }

  .title {
    font-weight: 800;
    font-size: 2.75rem;
  }

  .seperator {
    background-color: var(--text);
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
    margin: 12px 16px 24px 16px;
  }

  .add-trick {
    background: var(--accent);
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    font-size: .91rem;
    font-weight: bold;
    color: var(--text);
    float: right;
    position: relative;
    z-index: 1;
    transform: scale(.9);

    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      background: var(--accent);
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

  .learns {
    margin-top: 10px;

    h2 {
      font-size: 1.5rem;
      opacity: 1;
    }

    .learn {
      width: 100%;
      height: 40px;
      display: grid;
      align-items: center;
      margin: 12px 0;
      padding: 0 10px;
      grid-template-columns: 1fr 1fr 1fr;

      &.header {
        margin: 0px;
        margin-top: 15px;
        height: 20px;
        
        p {
          opacity: 1;
        }
      }

      &:nth-of-type(3) {
        margin-top: 0px;
      }

      p {
        font-size: 1.05rem;
        opacity: .6;

        &.trick {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 29vw;
        }

        &:nth-of-type(2) {
          margin: 0 auto;
        }

        &:nth-of-type(3) {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
