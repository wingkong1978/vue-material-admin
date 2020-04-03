
import './VCircle.styl'
import Colorable from 'vuetify/es5/mixins/colorable'
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function(sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable }); keys.push.apply(keys, symbols) } return keys }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function(key) { _defineProperty(target, key, source[key]) }) } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) } else { ownKeys(source).forEach(function(key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)) }) } } return target }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }) } else { obj[key] = value } return obj }
export default {

  mixins: [Colorable],

  props: {
    text: String,
    small: Boolean,
    large: Boolean,
    medium: Boolean,
    dot: Boolean,
    pill: Boolean,
    ring: Boolean
  },
  computed: {
    classes() {
      const classes = _objectSpread({}, {
        'circle-sm': this.small,
        'circle-lg': this.medium,
        'circle-xl': this.large,
        'circle-ring': this.ring,
        'circle-dot': this.dot,
        'circle-pill': this.pill,
        'theme--light': this.light,
        'theme--dark': this.dark
      })
      return classes
    }
  },
  render(h) {
    const data = {
      staticClass: 'circle',
      'class': this.classes,
      attrs: { tabindex: this.disabled ? -1 : 0 },
      on: this.$listeners
    }

    return h('span', data, [this.$slots.default])
  }

}
