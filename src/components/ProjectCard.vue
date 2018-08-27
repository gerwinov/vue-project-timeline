<template>
  <div class="flex flex-col cursor-pointer py-6" :style="{ backgroundColor: bgColor }" ref="card" @click="$emit('selected')" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div class="flex flex-row max-w-md overflow-hidden px-6">
      <div class="flex-none">
        <img class="w-16 mr-4" alt="project logo" :src="project.image">
      </div>
      <div class="flex flex-col">
        <h1 class="leading-none">{{ project.title }}</h1>
        <h2>{{ project.subtitle }}</h2>
        <h3 class="block sm:hidden pt-1" v-text="projectYears"></h3>
        <p class="pt-3 hidden sm:block" v-if="selected">{{ project.description }}</p>
      </div>
    </div>
    <div class="flex sm:hidden px-4">
      <p class="pt-3" v-if="selected">{{ project.description }}</p>
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