<script>
export default {
  name: "Particle",
  props: {
    svg: String,
    particle: {
      type: Object,
      default() {
        return {
          horizontal: null,
          vertical: null,
          rotate: null,
          scale: null
        }
      }
    }
  }
};
</script>

<template>
<div 
  ref="particle" 
  class="particle" 
  :style="{
    transitionDuration: `${particle.duration}s`,
    transitionDelay: `${particle.delay}s`,
    opacity: particle.horizontal ? 0 : .7,
    transform: `translate(${particle.horizontal}px, ${particle.vertical}px) scale(${particle.scale})`
  }"
  >
  <img :src="svg" alt="">
</div>
</template>

<style lang="scss" scoped>
.particle {
  position: absolute;
  transform: scale(0.7);
  transition: transform .4s cubic-bezier(.18,.93,.99,1), opacity .1s cubic-bezier(.18,.93,.99,1);
}
</style>
