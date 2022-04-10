<script>
export default {
  name: "Trick",
  props: {
    add: {
      type: Boolean,
      default: false,
    },
    trick: {
      type: Object,
      default() {
        return {
          text: "",
        };
      },
    },
  },
  emits: ["hide", "remove"],
  data() {
    return {
      text: "",
      complete: false,
    };
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
    removeTrick() {
      this.$emit("remove");
    },
    markComplete() {
      if (this.complete) return;

      this.complete = true;
      this.$store.commit("SET_NEW_LEARN", { show: true, trick: this.trick });
    },
  },
  mounted() {
    this.add && this.$store.state.tricks.length !== 0
      ? this.$refs.input.focus()
      : null;
  },
};
</script>

<template>
  <div class="trick" :class="{ add }">
    <button
      :disabled="add"
      class="checkbox"
      :class="{ complete }"
      @click="markComplete"
    ></button>
    <input
      v-if="add"
      v-model.trim="text"
      ref="input"
      type="text"
      placeholder="Type a trick..."
      @blur="!text ? hide() : null"
      @keyup.enter="addTrick"
      id="add-trick-input"
      autocomplete="false"
    />
    <button class="confirm" @click="addTrick">Add</button>
    <span class="underline"></span>

    <h3 :class="{ complete }">{{ trick.text }}</h3>

    <button class="remove" @click="removeTrick">
      <div></div>
      <div></div>
    </button>
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
    opacity: 0.5;
    background-color: transparent;

    &::placeholder {
      color: var(--text) !important;
      opacity: 0.5;
    }

    &:focus {
      border-bottom: 2px solid var(--text);
      padding-bottom: 3px;
      margin-bottom: -5px;
    }
  }

  .confirm {
    padding: 5px 8px;
    outline: none;
    color: var(--accent);
    font-weight: bold;
    filter: brightness(1.8);
    display: none;
  }

  .remove {
    width: 1.5rem;
    height: 1.5rem;
    outline: none;
    position: relative;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover div {
      background-color: var(--accent);
    }

    div {
      width: 75%;
      height: 0.2rem;
      background-color: var(--text);
      border-radius: 0.2rem;
      transform-origin: center;
      position: absolute;
      transition: background-color 0.3s ease;

      &:nth-of-type(1) {
        transform: rotate(45deg);
      }

      &:nth-of-type(2) {
        transform: rotate(-45deg);
      }
    }
  }

  &.add {
    opacity: 0.5;

    input {
      display: block;
    }

    .confirm {
      display: block;
    }

    .remove {
      display: none;
    }

    h3 {
      display: none;
    }
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 800;
    opacity: 0.7;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 88%;

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
    transition: background 0.3s ease;
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