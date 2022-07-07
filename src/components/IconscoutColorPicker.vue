<template>
  <div :class="['vc-iconscout-c', disableAlpha ? 'vc-iconscout-c__disable-alpha' : '']">
    <div class="vc-iconscout-c-saturation-wrap">
      <saturation v-model="colors" @change="childChange"></saturation>
    </div>
    <div
      v-if="defaultPalette.length"
      class="vc-iconscout-c-defaults"
    >
      <button
        v-for="(color, index) in defaultPalette"
        :key="index"
        :class="['vc-iconscout-c-button', (color === 'transparent' || color === 'white') ? `vc-iconscout-c-color-${color}` : '']"
        :style="{ backgroundColor: color }"
        @click="inputChange({ hex: color })"
      >
      </button>
    </div>
    <div class="vc-iconscout-c-body">
      <div class="vc-iconscout-c-controls">

        <div class="vc-iconscout-c-sliders">
          <div class="vc-iconscout-c-hue-wrap">
            <hue v-model="colors" @change="childChange"></hue>
          </div>
          <div class="vc-iconscout-c-alpha-wrap" v-if="!disableAlpha">
            <alpha v-model="colors" @change="childChange"></alpha>
          </div>
        </div>
      </div>

      <div class="vc-iconscout-c-fields-wrap" v-if="!disableFields">
        <div class="vc-iconscout-c-fields" v-show="fieldsIndex === 0">
          <!-- hex -->
          <div class="vc-iconscout-c-field hex">
            <div class="copyright" @click="onCopy">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" >
                <path d="M15.5 6.45033C15.4913 6.37377 15.4746 6.29835 15.45 6.22533V6.15033C15.4099 6.06464 15.3565 5.98588 15.2917 5.91699L10.2917 0.916992C10.2228 0.852172 10.144 0.798726 10.0583 0.758659C10.0335 0.755126 10.0082 0.755126 9.98333 0.758659C9.89868 0.71011 9.80519 0.678946 9.70833 0.666992H6.33333C5.67029 0.666992 5.03441 0.930384 4.56557 1.39923C4.09673 1.86807 3.83333 2.50395 3.83333 3.16699V4.00033H3C2.33696 4.00033 1.70107 4.26372 1.23223 4.73256C0.763392 5.2014 0.5 5.83728 0.5 6.50033V14.8337C0.5 15.4967 0.763392 16.1326 1.23223 16.6014C1.70107 17.0703 2.33696 17.3337 3 17.3337H9.66667C10.3297 17.3337 10.9656 17.0703 11.4344 16.6014C11.9033 16.1326 12.1667 15.4967 12.1667 14.8337V14.0003H13C13.663 14.0003 14.2989 13.7369 14.7678 13.2681C15.2366 12.7993 15.5 12.1634 15.5 11.5003V6.50033C15.5 6.50033 15.5 6.50033 15.5 6.45033ZM10.5 3.50866L12.6583 5.66699H11.3333C11.1123 5.66699 10.9004 5.5792 10.7441 5.42291C10.5878 5.26663 10.5 5.05467 10.5 4.83366V3.50866ZM10.5 14.8337C10.5 15.0547 10.4122 15.2666 10.2559 15.4229C10.0996 15.5792 9.88768 15.667 9.66667 15.667H3C2.77899 15.667 2.56702 15.5792 2.41074 15.4229C2.25446 15.2666 2.16667 15.0547 2.16667 14.8337V6.50033C2.16667 6.27931 2.25446 6.06735 2.41074 5.91107C2.56702 5.75479 2.77899 5.66699 3 5.66699H3.83333V11.5003C3.83333 12.1634 4.09673 12.7993 4.56557 13.2681C5.03441 13.7369 5.67029 14.0003 6.33333 14.0003H10.5V14.8337ZM13.8333 11.5003C13.8333 11.7213 13.7455 11.9333 13.5893 12.0896C13.433 12.2459 13.221 12.3337 13 12.3337H6.33333C6.11232 12.3337 5.90036 12.2459 5.74408 12.0896C5.5878 11.9333 5.5 11.7213 5.5 11.5003V3.16699C5.5 2.94598 5.5878 2.73402 5.74408 2.57774C5.90036 2.42146 6.11232 2.33366 6.33333 2.33366H8.83333V4.83366C8.83333 5.4967 9.09672 6.13259 9.56557 6.60143C10.0344 7.07027 10.6703 7.33366 11.3333 7.33366H13.8333V11.5003Z" fill="#B4BAD6"/>
              </svg>
            </div>
             <ed-in label="hex" :value="colors.hex" @change="inputChange"></ed-in>
          </div>
        </div>
        <div class="vc-iconscout-c-fields" v-show="fieldsIndex === 1">
          <!-- rgba -->
          <div class="vc-iconscout-c-field">
            <ed-in label="r" :value="colors.rgba.r" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field">
            <ed-in label="g" :value="colors.rgba.g" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field">
            <ed-in label="b" :value="colors.rgba.b" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field" v-if="!disableAlpha">
            <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
          </div>
        </div>
        <div class="vc-iconscout-c-fields" v-show="fieldsIndex === 2">
          <!-- hsla -->
          <div class="vc-iconscout-c-field">
            <ed-in label="h" :value="hsl.h" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field">
            <ed-in label="s" :value="hsl.s" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field">
            <ed-in label="l" :value="hsl.l" @change="inputChange"></ed-in>
          </div>
          <div class="vc-iconscout-c-field" v-if="!disableAlpha">
            <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
          </div>
        </div>
        <!-- btn -->
        <div v-if="!disableToggle" class="vc-iconscout-c-toggle-btn" @click="toggleViews">
          <div class="vc-iconscout-c-toggle-icon">
            <svg style="width:24px; height:24px" viewBox="0 0 24 24"
              @mouseover="showHighlight"
              @mouseenter="showHighlight"
              @mouseout="hideHighlight">
              <path fill="#333" d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
            </svg>
          </div>
          <div class="vc-iconscout-c-toggle-icon-highlight" v-show="highlight"></div>
        </div>
        <!-- btn -->
        <!-- active color preview -->
        <div class="vc-iconscout-c-color-wrap">
          <div class="vc-iconscout-c-active-color" :style="{background: activeColor}"></div>
          <checkboard v-if="!disableAlpha"></checkboard>
        </div>
        <!-- active color preview -->
      </div>
    </div>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import editableInput from './common/EditableInput.vue'
import saturation from './common/Saturation.vue'
import hue from './common/Hue.vue'
import alpha from './common/Alpha.vue'
import checkboard from './common/Checkboard.vue'

export default {
  name: 'Chrome',
  mixins: [colorMixin],
  props: {
    disableAlpha: {
      type: Boolean,
      default: false
    },
    disableFields: {
      type: Boolean,
      default: false
    },
    disableToggle: {
      type: Boolean,
      default: false
    },
    defaultPalette: {
      type: Array,
      default: () => []
    }
  },
  components: {
    saturation,
    hue,
    alpha,
    'ed-in': editableInput,
    checkboard
  },
  data () {
    return {
      fields: ['hex', 'rgba', 'hsla'],
      fieldsIndex: 0,
      highlight: false
    }
  },
  computed: {
    hsl () {
      const { h, s, l } = this.colors.hsl
      return {
        h: h.toFixed(),
        s: `${(s * 100).toFixed()}%`,
        l: `${(l * 100).toFixed()}%`
      }
    },
    activeColor () {
      const rgba = this.colors.rgba
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
    }
  },
  watch: {
    colors (newVal) {
      const { a } = newVal
      if (a < 1 && this.fieldsIndex === 0) {
        this.fieldsIndex = 1
      }
    }
  },
  methods: {
    onCopy() {
      const self = this
      import(
        'copy-to-clipboard'
      ).then((r) => { 
        r.default(self.colors.hex)
        self.$emit('copied')
      })
    },
    handlePreset (c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      })
    },
    childChange (data) {
      this.colorChange(data)
    },
    inputChange (data) {
      if (!data) {
        return
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex'
        })
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        })
      } else if (data.h || data.s || data.l) {
        const s = data.s ? (data.s.replace('%', '') / 100) : this.colors.hsl.s
        const l = data.l ? (data.l.replace('%', '') / 100) : this.colors.hsl.l

        this.colorChange({
          h: data.h || this.colors.hsl.h,
          s,
          l,
          source: 'hsl'
        })
      }
    },
    toggleViews () {
      if (this.fieldsIndex >= 2) {
        this.fieldsIndex = this.colors.a < 1 ? 1 : 0
        return
      }
      this.fieldsIndex++
    },
    showHighlight () {
      this.highlight = true
    },
    hideHighlight () {
      this.highlight = false
    }
  }
}
</script>

<style>
.vc-iconscout-c {
  background: #fff;
  border-radius: 3px;
  box-sizing: initial;
  width: 225px;
  background-color: #fff;
}
.vc-iconscout-c-controls {
  display: flex;
}
.vc-iconscout-c-color-wrap {
  position: relative;
  width: 34px;
  height: 34px;
  margin-left: 12px;
}
.vc-iconscout-c-active-color {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
}
.vc-iconscout-c-color-wrap .vc-checkerboard {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-size: auto;
}
.vc-iconscout-c-sliders {
  flex: 1;
}
.vc-iconscout-c-fields-wrap {
  display: flex;
  align-items: center;
  padding-top: 15px;
}
.vc-iconscout-c-fields {
  display: flex;
  margin-left: -6px;
  flex: 1;
}
.vc-iconscout-c-field {
  padding-left: 6px;
  width: 100%;
  position: relative;
}
.vc-iconscout-c-field.hex .vc-editable-input .vc-input__input {
  padding-left: 35px;
  padding-right: 10px;
  box-sizing: border-box;
}
.vc-iconscout-c-field .copyright{
  position: absolute;
  left: 16.5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 9;
}
.vc-iconscout-c-field .copyright svg{
  display: block;
}
.vc-iconscout-c-toggle-btn {
  width: 32px;
  text-align: right;
  position: relative;
}
.vc-iconscout-c-toggle-icon {
  margin-right: -4px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
.vc-iconscout-c-toggle-icon-highlight {
  position: absolute;
  width: 24px;
  height: 28px;
  background: #eee;
  border-radius: 4px;
  top: -2px;
  left: 12px;
}
.vc-iconscout-c-hue-wrap {
  position: relative;
  height: 10px;
  margin-bottom: 18px;
}
.vc-iconscout-c-alpha-wrap {
  position: relative;
  height: 10px;
}
/* .vc-iconscout-c-hue-wrap .vc-hue {
  border-radius: 2px;
} */
.vc-iconscout-c-alpha-wrap .vc-alpha-gradient {
  border-radius: 8px;
}
.vc-iconscout-c-hue-wrap .vc-hue-picker, .vc-iconscout-c-alpha-wrap .vc-alpha-picker {
  width: 14px;
  height: 14px;
  transform: translate(-6px, -2px);
  border: 3px solid #fff;
  background-color: transparent;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}
.vc-iconscout-c-body {
  padding: 15px 0 0 0;
  background-color: #fff;
}
.vc-iconscout-c-saturation-wrap {
  width: 100%;
  padding-bottom: 55%;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
}
.vc-iconscout-c-saturation-wrap .vc-saturation-circle {
  width: 14px;
  height: 14px;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.vc-iconscout-c-fields .vc-input__input {
  font-weight: normal;
  font-size: 14px;
  line-height: 160%;
  color: #000;
  width: 100%;
  border: none;
  box-shadow: inset 0 0 0 1px #EBEDF5;
  background: #FAFAFC;
  border-radius: 5px;
  height: 34px;
  text-align: center;
}
.vc-iconscout-c-fields .vc-input__label {
  text-transform: uppercase;
  font-size: 11px;
  line-height: 11px;
  color: #969696;
  text-align: center;
  display: block;
  display: none;
}
.vc-iconscout-c__disable-alpha .vc-iconscout-c-hue-wrap {
  margin-top: 4px;
  margin-bottom: 4px;
}
.vc-iconscout-c-defaults {
  background-color: transparent;
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(8, 20px);
  grid-gap: 9px;
}
.vc-iconscout-c-button {
  height: 20px;
  width: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0;
  border-radius: 22px;
  outline: none !important;
  cursor: pointer;
}
.vc-iconscout-c-color-white {
  border-color: #DBDBDB;
}
.vc-iconscout-c-color-transparent {
  border-color: rgba(0, 0, 0, 0.5);
  background-color: #fff;
  background-image:
    -webkit-linear-gradient(45deg,#E4E9F2 25%,transparent 25%,transparent 75%,#E4E9F2 75%,#E4E9F2),
    -webkit-linear-gradient(45deg,#E4E9F2 25%,transparent 25%,transparent 75%,#E4E9F2 75%,#E4E9F2) !important;
  background-position: 0 0,5px 5px;
  background-size: 10px 10px;
}
</style>
