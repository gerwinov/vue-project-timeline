<template>
  <div id="app" v-if="projects">
    <div class="flex" v-if="invalidProjects.length === 0">
      <div class="hidden sm:flex sm:w-1/2 md:w-1/4 justify-end sm:pr-4" :style="{ backgroundColor: timelineBgColor }" @mouseenter="hoverOn()" @mouseleave="hoverOff()">
        <div class="flex flex-col border-r-2 py-4" :style="{ borderColor: timelineColor }">
          <div class="flex text-white pr-2 h-10 items-center" :key="'y' + key" v-for="(year, key) in timelineYears">
            <h3 class="font-normal">{{ year }}</h3>
          </div>
        </div>
        <div class="flex flex-col py-4" :key="'t' + key" v-for="(timeline, key) in timelines">
          <div class="ml-4" :key="'p' + key" v-for="(projectId, key) in timeline">
            <div class="h-10" :key="'n' + key" v-for="(n, key) in getProjectSpacing(timeline, key)"></div>
            <div
              class="h-10 w-3 cursor-pointer bg-white opacity-50"
              :style="getTimelineElementStyle(projectId)"
              :class="{ 'shadow-md opacity-100' : selectedProject === projectId }"
              :key="'py' + key"
              v-for="(n, key) in getProjectYears(projectId)"
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
          :key="'pc' + key"
          v-for="(project, key) in sortedProjects"
          @selected="selectedProject = key">
        </project-card>
      </div>
    </div>
    <config-error :invalidProjects="invalidProjects" v-else></config-error>
  </div>
</template>

<script>
  import ProjectCard from './components/ProjectCard.vue'
  import ConfigError from './components/ConfigError.vue'

  export default {
    name: 'app',

    components: {
      ProjectCard, ConfigError
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

      projects: {
        required: true,
        type: Array
      }
    },

    data () {
      return {
        selectedProject: 0
      }
    },

    computed: {
      sortedProjects () {
        let projects = this.projects.map((project) => {
          if (!project.endYear) {
            // Use Object.assign to avoid mutating an object which belongs to the project array, which is a prop.
            return Object.assign({}, project, {
              endYear: this.currentYear
            })
          }
          return project
        })

        return projects.sort((a, b) => {
          if (a.endYear > b.endYear) {
            return -1;
          }
          if (a.endYear < b.endYear) {
            return 1;
          }
          return 0;
        })
      },

      invalidProjects () {
        let invalids = []

        this.projects.forEach((project) => {
          if (project.title) {
            if (project.startYear && project.startYear > 1900 && project.startYear < 2100) {
              if (project.endYear <= this.currentYear) {
                if (!project.endYear || project.endYear >= project.startYear)
                return
              }
            }
          }

          invalids.push(project)
        })

        return invalids
      },

      endYear () {
        return Math.max.apply(Math, this.sortedProjects.map((project) => {
          return project.endYear
        }))
      },

      startYear () {
        return Math.min.apply(Math, this.sortedProjects.map((project) => {
          return project.startYear
        }))
      },

      currentYear () {
        return (new Date()).getFullYear()
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
        return (this.sortedProjects[timeline[key - 1]].startYear - this.sortedProjects[timeline[key]].endYear) * 2 - 1
      },

      getTimelineElementStyle (projectId) {
        if (this.selectedProject === projectId) {
          return 'backgroundColor: ' + this.sortedProjects[projectId].color
        }
      },

      hoverOn () {
        window.addEventListener('wheel', this.handleScroll)
      },

      hoverOff () {
        window.removeEventListener('wheel', this.handleScroll)
      },

      handleScroll (e) {
        if (e.deltaY > 0) this.nextProject()
        if (e.deltaY < 0) this.prevProject()

        e.preventDefault()
      },

      nextProject () {
        if (this.selectedProject < this.sortedProjects.length - 1) {
          this.selectedProject++
          return
        }

        this.selectedProject = 0
      },

      prevProject () {
        if (this.selectedProject > 0) {
          this.selectedProject--
          return
        }

        this.selectedProject = this.sortedProjects.length - 1
      }
    },
  }
</script>

<style src="./styles/main.css"></style>
