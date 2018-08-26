<template>
  <div id="app">
    <div class="flex flex-row flex-wrap">
      <div class="flex w-full sm:w-1/2 md:w-1/4 sm:justify-end pr-4" :style="{ backgroundColor: timelineBgColor }">
        <div class="flex flex-col border-r-2 py-4" :style="{ borderColor: timelineColor }">
          <div class="flex text-white pr-2 h-10 items-center justify-end" v-for="year in timelineYears">
            <h3 class="font-normal">{{ year }}</h3>
          </div>
        </div>
        <div class="flex flex-col py-4" v-for="timeline in timelines">
          <div class="ml-4" v-for="(projectId, key) in timeline">
            <div class="h-10" v-for="n in getProjectSpacing(timeline, key)"></div>
            <div
              class="h-10 w-3 cursor-pointer"
              :class="{ 'animated pulse shadow-md': selectedProject === projectId }"
              :style="getTimelineElementStyle(projectId)"
              v-for="n in getProjectYears(projectId)"
              @click="selectedProject = projectId">
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full sm:w-1/2 md:w-3/4">
        <project-card
          :project="project"
          :selected="selectedProject === key"
          :selectedBgColor="selectedBgColor"
          :hoverBgColor="hoverBgColor"
          v-for="(project, key) in sortedProjects"
          @selected="selectedProject = key">
        </project-card>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCard from './components/ProjectCard.vue'

export default {
  name: 'app',

  components: {
    ProjectCard
  },

  props: {
    timelineColor: {
      required: false,
      default: '#979797',
      type: String
    },

    timelineBgColor: {
      required: false,
      default: '#99B0A8',
      type: String
    },

    selectedBgColor: {
      required: false,
      default: '#F7B93A',
      type: String
    },

    hoverBgColor: {
      required: false,
      default: '#FFEDCB',
      type: String
    },
  },

  data () {
    return {
      projects: [
        {
          title: 'Ebicus',
          subtitle: 'Consultant',
          description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          image: `https://orig00.deviantart.net/e475/f/2011/338/e/f/the_green_circle___flag___logo_by_exxp0-d4i51ve.png`,
          startYear: 2010,
          endYear: 2017,
          color: 'blue'
        },
        {
          title: 'Overeem.io',
          subtitle: 'Frontend developer',
          description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          image: `https://orig00.deviantart.net/e475/f/2011/338/e/f/the_green_circle___flag___logo_by_exxp0-d4i51ve.png`,
          startYear: 2018,
          endYear: 2018,
          color: 'yellow'
        },
        {
          title: 'Foryard',
          subtitle: 'Frontend developer',
          description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          image: `https://orig00.deviantart.net/e475/f/2011/338/e/f/the_green_circle___flag___logo_by_exxp0-d4i51ve.png`,
          startYear: 2017,
          endYear: 2018,
          color: 'green'
        }
      ],
      selectedProject: 0
    }
  },

  computed: {
    sortedProjects () {
      return this.projects.slice().sort((a, b) => {
        if (a.endYear > b.endYear) {
          return -1;
        }
        if (a.endYear < b.endYear) {
          return 1;
        }
        return 0;
      })
    },

    endYear () {
      return Math.max.apply(Math, this.projects.map((project) => {
        return project.endYear
      }))
    },

    startYear () {
      return Math.min.apply(Math, this.projects.map((project) => {
        return project.startYear
      }))
    },

    timelines () {
      let timelines = []

      this.sortedProjects.forEach((project, index) => {
        this.addToTimeline(project.endYear, index, timelines)
      })

      return timelines
    },

    timelineYears () {
      let timelineYears = []

      for (let i = this.endYear; i >= this.startYear; i--) {
        timelineYears.push(i)
        if (i !== this.startYear) timelineYears.push(null)
      }

      return timelineYears
    }
  },

  methods: {
    addToTimeline (projectEndYear, projectIndex, timelines, timelineIndex = 0) {
      if (!Array.isArray(timelines[timelineIndex])) {
        timelines[timelineIndex] = [projectIndex]
        return timelines
      }

      if (projectEndYear < this.sortedProjects[timelines[timelineIndex][timelines[timelineIndex].length -1]].startYear) {
        timelines[timelineIndex].push(projectIndex)
        return timelines
      }

      this.addToTimeline(projectEndYear, projectIndex, timelines, timelineIndex + 1)
    },

    getProjectYears (id) {
      return ((this.sortedProjects[id].endYear - this.sortedProjects[id].startYear) * 2) + 1
    },

    getProjectSpacing (timeline, key) {
      if (key === 0) {
        return (this.endYear - this.sortedProjects[timeline[key]].endYear) * 2
      }
      return (this.sortedProjects[timeline[key - 1]].startYear - this.sortedProjects[timeline[key]].endYear)
    },

    getTimelineElementStyle(projectId) {
      let style = 'backgroundColor: ' + this.sortedProjects[projectId].color
      if (this.selectedProject === projectId) {
        return style + '; animationIterationCount: infinite;'
      }
      return style
    }
  }
}
</script>

// This should be removed, only for testing!
<style>
  h1, h2, h3 {
    font-family: 'Oxygen';
    font-weight: 400;
  }

  p {
    font-family: 'Source Sans Pro';
  }
</style>
