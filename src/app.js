import color from './Color.vue'
import material from './components/Material.vue'

Vue.config.debug = true

new Vue({
	el: '#app',
	components: {
    color,
    material
  },
  data: {
    hex: '#333',
    rgba: {
      r: 51,
      g: 51,
      b: 51,
      a: 1,
    },
    hsl: {
      h: 0,
      s: 0,
      l: .20,
      a: 1,
    }
  }
})
