<script>
export default {
  name: "Trick",
  props: {
    add: {
      type: Boolean,
      default: false
    },
    trick: {
      type: Object,
      default() {
        return {
          text: ""
        }
      }
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
    this.add && this.$store.state.tricks.length !== 0 ? this.$refs.input.focus() : null;
  }
}
</script>

<template>
<div class="trick" :class="{ add }">
  <button :disabled="add" class="checkbox" :class="{ complete }" @click="markComplete"></button>
  <input 
    v-if="add"
    v-model.trim="text"
    ref="input" 
    type="text" 
    placeholder="Type a trick..." 
    @blur="hide"
    @keyup.enter="addTrick"
    id="add-trick-input"
  >
  <span class="underline"></span>
  <h3 :class="{ complete }">{{ trick.text }}</h3>
</div>
</template>

<style lang="scss" scoped>
.trick {
  display: flex;
  align-items: center;
  margin: 8px 0;
  color: var(--text);

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
    color: var(--text);
    opacity: .5;
    background-color: transparent;

    &::placeholder {
      color: var(--text) !important;
      opacity: .5;
    }

    &:focus {
      border-bottom: 2px solid var(--text);
      padding-bottom: 3px;
      margin-bottom: -5px;
    }
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

    &.complete {
      text-decoration: line-through;
    }
  }

  .checkbox {
    width: 26px;
    height: 26px;
    border: 2px solid var(--text);
    border-radius: 5px;
    margin-right: 8px;
    transition: background .3s ease;
    outline: none;

    &.complete {
      border: none;
      background-color: var(--tick-bg);
      background-image: url("../assets/tick.svg");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 14px;
    }
  }
}
</style>