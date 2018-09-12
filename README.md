# Vue Project-timeline
![npm(scoped)](https://img.shields.io/npm/v/@gerwinov/vue-project-timeline.svg) ![npm](https://img.shields.io/npm/dt/@gerwinov/vue-project-timeline.svg) ![Github](https://img.shields.io/github/license/mashape/apistatus.svg)

## Installation
```bash
npm install @gerwinov/vue-project-timeline --save
```

## Usage
Import in your Vue component..
```js
import VueProjectTimeline from '@gerwinov/vue-project-timeline';

export default {
  components: {
    VueProjectTimeline
  }
}
```
..and use it
```vue
<VueProjectTimeline :projects="projects" />
```

## Props
You can pass the following props to the Vue Project-timeline component:

| Prop name | Description | Type | Required | Default Value |
|-----|-----|-----|-----|-----|
| timelineColor | The color of the 1px vertical line next to the years | String | N | #979797 |
| timelineBgColor | The background color of the timeline (vertical line + years) | String | N | #99B0A8 |
| selectedBgColor | The background color of the selected project card | String | N | #F7B93A |
| hoverBgColor | The background color of a hovered project card | String | N | #FFEDCB |
| projects | The projects to display on the timeline (explained below) | Array | Y | - |

### Projects syntax
The `projects` prop expects an Array of Objects. Each object can have the following keys:

| Key | Description | Type | Required | Rules | Default value |
|-----|-----|-----|-----|-----|-----|
| title | The title of the project | String | Y | - | - |
| subtitle | The subtitle of the project | String | N | - | - |
| description | The description of the project | String | N | - | - |
| startYear | The start year of the project | Number | Y | Between 1900 - 2100 | - |
| endYear | The end year of the project | Number | Y | >= start year && <= current year | Current year when `0` or `null` provided |
| image | The location of an image that is displayed with the project | String | N | - | - |
| color | The color of the project in the timelne when selected | String | N | - | #ffffff |

An example `projects` Array would be the following:
```js
projects: [
  {
    title: 'Client one',
    subtitle: 'Developer',
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                 quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                 consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                 cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                 proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: `logo.png`,
    startYear: 2014,
    endYear: 2017,
    color: '#4a63e0'
  }
]
```

## Styling
The Vue Project-timeline component uses the styling as present in your project for `h1, h2, h3, p` elements. These are used on the project cards. You can affect only elements in the Vue Project-timeline component by using `#vue-project-timeline` in your own CSS, as the whole component is wrapped in a `div` with that id.

## Feature requests
Feature requests on this component are welcome!


