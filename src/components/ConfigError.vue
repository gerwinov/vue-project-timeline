<template>
  <div>
    <p class="mb-8">
      The projects below have invalid config. Please see <a href="https://github.com/gerwinov/vue-project-timeline">the docs</a> for required config.
    </p>
    <ul class="mb-8" :key="'ip' + key" v-for="(project, key) in invalidProjects">
      <li><strong>Title:</strong> {{ project.title }}</li>
      <li><strong>Subtitle:</strong> {{ project.subtitle }}</li>
      <li><strong>Description:</strong> {{ project.description }}</li>
      <li><strong>Start year:</strong> {{ project.startYear }}</li>
      <li><strong>End year:</strong> {{ project.endYear }}</li>
      <li><strong>Color:</strong> {{ project.color }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ConfigError',

    props: {
      invalidProjects: {
        required: true,
        type: Array
      }
    }
  }
</script>