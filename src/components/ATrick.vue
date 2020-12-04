<script>
export default {
  name: "Trick",
  props: {
    add: {
      type: Boolean,
      default: false
    },
    trick: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      text: "",
      complete: false
    }
  },
  methods: {
    hide() {
      this.$emit("hide");
    },
    addTrick() {
      this.hide();
      if (!this.text) return;

      this.$store.commit("ADD_TRICK", this.text);
    },
    markComplete() {
      if (this.complete) return;

      this.complete = true;
      this.$store.commit("SET_NEW_LEARN", { show: true, trick: this.trick });
    }
  },
  mounted() {
    this.$refs.input.focus();
  }
}
</script>

<template>
<div class="trick" :class="{ add }">
  <button class="checkbox" :class="{ complete }" @click="markComplete"></button>
  <input 
    v-model.trim="text"
    ref="input" 
    type="text" 
    placeholder="Type a trick..." 
    @blur="hide"
    @keyup.enter="addTrick"
  >
  <span class="underline"></span>
  <h3>{{ trick }}</h3>
</div>
</template>

<style lang="scss" scoped>
.trick {
  display: flex;
  align-items: center;
  margin: 8px 0;

  input {
    padding: 0;
    line-height: 0;
    width: 10px;
    flex-grow: 1;
    font-weight: 800;
    font-size: 1.4rem;
    display: none;
    outline: none;
    position: relative;

    &:focus {
      border-bottom: 2px solid rgba(0, 0, 0, 0.3);
      padding-bottom: 3px;
      margin-bottom: -5px;
    }
  }

  .confirm {
    padding: 4px 15px;
    margin-left: 8px;
    font-weight: 800;
    background-color: #12C2E9;
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    display: none;
    outline: none;
    transform: scale(.9);
  }

  &.add {
    opacity: .5;

    input {
      display: block;
    }

    .confirm {
      display: block;
    }

    h3 {
      display: none;
    }
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 800;
    opacity: .7;
  }

  .checkbox {
    width: 26px;
    height: 26px;
    border: 2px solid black;
    border-radius: 5px;
    margin-right: 8px;
    transition: background .3s ease;
    outline: none;

    &.complete {
      border: none;
      background-color: #86E166;
      background-image: url("../assets/tick.svg");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 14px;
    }
  }
}
</style>