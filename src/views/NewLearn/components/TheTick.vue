<script>
import Particle from "./ATickParticle.vue";

// particles
import p1 from "@/assets/particle01.svg";

// tick sound
import tickAudioLoc from "@/assets/newlearn.mp3";
const tickAudio = new Audio(tickAudioLoc);

export default {
  name: "Tick",
  components: {
    Particle
  },
  data() {
    return {
      particleSvg: p1,
      particles: []
    }
  },
  methods: {
    RandInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    RandParticle(current, count, delay = 0) {
      const RADIUS = window.innerHeight / 3;
      const ANGLE = (360 / count) * current;

      return { 
        horizontal: RADIUS * Math.cos(ANGLE * Math.PI / 180),
        vertical:  RADIUS * Math.sin(ANGLE * Math.PI / 180),
        scale: this.RandInt(4, 6) / 10,
        duration: this.RandInt(4, 7) / 10,
        delay: delay
      }
    },
    generateParticles(empty, delay) {
      const particles = [];
      const PARTICLE_COUNT = 40;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (empty) {
          particles.push({ 
            horizontal: null,
            vertical: null,
            scale: null,
            rotate: null
          })

          continue;
        }

        particles.push({
          ...this.RandParticle(i, PARTICLE_COUNT, delay),
        });
      }

       return particles;
    },
    fillParticles(empty) {
      this.particles = [ 
        ...this.generateParticles(empty, .5),  
        ...this.generateParticles(empty, .54),  
        ...this.generateParticles(empty, .58),  
      ];
    },
    playAudio() {
      tickAudio.play();
    }
  },
  mounted() {
    this.fillParticles(true);
    setTimeout(() => {
      this.fillParticles();
    }, 60);
  }
};
</script>

<template>
<div class="tick-container" @animationend="playAudio">
  <Particle
   v-for="(p, i) in particles" 
   :key="i" 
   :index="i" 
   :svg="particleSvg" 
   :particle="p" 
   @transitionend="i === 119 ? particles = [] : null"
  />

  <div class="tick">
    <img src="@/assets/tick.svg" alt="">
  </div>
</div>
</template>

<style lang="scss" scoped>
.tick-container {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform: translate(calc(50vw + 400px)) rotate(180deg);
  animation: slide-in .6s ease forwards, pulse 2.5s ease infinite .5s;
  text-align: center;

  @keyframes slide-in {
    to {
      transform: translate(0px);
    }
  }

  @keyframes pulse {
    20% {
      transform: scale(1.2)
    }

    to {
      transform: scale(1.1)
    }
  }

  .tick {
    z-index: 2;
    width: 40vw;
    height: 40vw;
    max-width: 200px;
    max-height: 200px;
    background-color: #86E166;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 60px 2px #86ff5b,
                0px 0px 0px 10px #94ff7033;

    img {
      width: 50%;
      height: 50%;
    }
  }
}
</style>
