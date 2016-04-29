<template>
  <div class="c-alpha">
    <div class="checkboard-wrap">
      <checkboard></checkboard>
    </div>
    <div class="gradient" :style="{background: gradientColor}"></div>
    <div class="container" v-el:container
        @mousedown="handleMouseDown"
        @touchmove="handleChange"
        @touchstart="handleChange">
      <div class="pointer" :style="{left: colors.a * 100 + '%'}">
        <div class="picker"></div>
      </div>
    </div>
  </div>
</template>

<script>
import checkboard from './Checkboard.vue'

export default {
  name: 'Alpha',
  props: {
    colors: Object,
    onChange: Function
  },
  components:{
    checkboard
  },
  data () {
    return {}
  },
  computed: {
    gradientColor () {
      var rgba = this.colors.rgba
      return 'linear-gradient(to right, rgba(' + rgba.r + ', ' + rgba.g + ', ' + rgba.b + ', 0) 0%, rgba(' + rgba.r + ', ' + rgba.g + ', ' + rgba.b + ', 1) 100%)'
    }
  },
  methods:{
    handleChange (e, skip)  {
      !skip && e.preventDefault()
      var container = this.$els.container
      var containerWidth = container.clientWidth
      var left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)

      var a
      if (left < 0) {
        a = 0
      } else if (left > containerWidth) {
        a = 1
      } else {
        a = Math.round(left * 100 / containerWidth) / 100
      }

      if (this.colors.a !== a) {
        this.onChange({
          h: this.colors.hsl.h,
          s: this.colors.hsl.s,
          l: this.colors.hsl.l,
          a: a,
          source: 'rgba',
        })
      }
    },

    handleMouseDown (e)  {
      this.handleChange(e, true)
      window.addEventListener('mousemove', this.handleChange)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp  () {
      this.unbindEventListeners()
    },
    unbindEventListeners  ()  {
      window.removeEventListener('mousemove', this.handleChange)
      window.removeEventListener('mouseup', this.handleMouseUp)
    }
  }
}
</script>

<style lang="stylus">
.c-alpha
  position absolute
  top 0px
  right 0px
  bottom 0px
  left 0px
  .checkboard-wrap
    position absolute
    top 0px
    right 0px
    bottom 0px
    left 0px
    overflow hidden
  .gradient
    position absolute
    top 0px
    right 0px
    bottom 0px
    left 0px
  .container
    position relative
    z-index 2
    height 100%
    margin 0 3px
  .pointer
    z-index 2
    position absolute
  .picker
    width 4px
    border-radius 1px
    height 8px
    box-shadow 0 0 2px rgba(0, 0, 0, .6)
    background #fff
    margin-top 1px
    transform translateX(-2px)
</style>