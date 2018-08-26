<template>
  <div class="flex cursor-pointer" :style="{ backgroundColor: bgColor }" ref="card" @click="$emit('selected')" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div class="flex flex-row max-w-md overflow-hidden px-6 py-6">
      <div class="flex-none">
        <img class="w-16 mr-4" alt="project logo" :src="project.image">
      </div>
      <div class="flex flex-col">
        <h1>{{ project.title }}</h1>
        <h2>{{ project.subtitle }}</h2>
        <p class="pt-3" v-if="selected">{{ project.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import smoothReflow from 'vue-smooth-reflow';

  export default {
    name: 'ProjectCard',

    mixins: [smoothReflow],

    props: {
      project: {
        required: true,
        type: Object
      },

      selected: {
        required: false,
        default: false,
        type: Boolean
      },

      selectedBgColor: {
        required: false,
        type: String
      },

      hoverBgColor: {
        required: false,
        type: String
      }
    },

    data () {
      return {
        hovering: false
      }
    },

    computed: {
      bgColor () {
        if (this.selected) return this.selectedBgColor
        if (this.hovering) return this.hoverBgColor
      }
    },

    mounted(){
      this.$smoothReflow({
        el: this.$refs.card,
        property: 'height'
      })
    }
  }
</script>