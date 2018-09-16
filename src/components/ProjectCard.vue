<template>
  <div class="ptl1-flex ptl1-flex-col ptl1-cursor-pointer" :style="{ backgroundColor: bgColor }" ref="card" @click="$emit('selected')" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div class="ptl1-flex ptl1-flex-row ptl1-max-w-md ptl1-overflow-hidden ptl1-px-6 ptl1-my-6">
      <div class="ptl1-flex-none ptl1-w-16 ptl1-mr-4">
        <img alt="project logo" :src="project.image" v-if="project.image">
      </div>
      <div class="ptl1-flex ptl1-flex-col">
        <h1 class="ptl1-leading-none" :class="{ 'ptl1-text-white' : selected }">{{ project.title }}</h1>
        <h2 :class="{ 'ptl1-text-white' : selected }">{{ project.subtitle }}</h2>
        <h3 class="ptl1-block sm:ptl1-hidden mt-1" :class="{ 'ptl1-text-white' : selected }" v-text="projectYears"></h3>
        <p class="ptl1-hidden sm:ptl1-block ptl1-text-white" v-show="selected" v-html="project.description"></p>
      </div>
    </div>
    <div class="ptl1-flex sm:ptl1-hidden ptl1-px-4">
      <p class="ptl1-text-white ptl1-mb-6" v-show="selected" v-html="project.description"></p>
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
      },

      projectYears () {
        if (this.project.startYear === this.project.endYear) {
          return this.project.startYear
        }
        return this.project.startYear + ' - ' + this.project.endYear
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
