<script>
export default {
  name: "Particle",
  props: {
    particle: {
      type: Object,
      default() {
        return {
          horizontal: null,
          vertical: null,
          rotate: null,
          scale: null,
        };
      },
    },
    index: Number,
  },
  emits: ["spawn-particles"],
  mounted() {
    if (this.index === 119) {
      this.$emit("spawn-particles");
    }
  },
};
</script>

<template>
  <div
    ref="particle"
    class="particle"
    :style="{
      transitionDuration: `${particle.duration}s`,
      transitionDelay: `${particle.delay}s`,
      opacity: particle.horizontal ? 0 : 0.7,
      transform: `translate(${particle.horizontal}px, ${particle.vertical}px) scale(${particle.scale})`,
    }"
  />
</template>

<style lang="scss" scoped>
.particle {
  position: absolute;
  transform: scale(0.7);
  transition: transform 0.4s cubic-bezier(0.18, 0.93, 0.99, 1),
    opacity 0.1s cubic-bezier(0.18, 0.93, 0.99, 1);
  background-color: var(--tick-bg);
  width: 68px;
  height: 68px;
  border-radius: 50%;
}
</style>
