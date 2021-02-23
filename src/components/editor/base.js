import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import defaults from 'lodash/defaults';
import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';

export default {
  props: {
    value: {
      type: [String, Number, Array, Object],
      default: null,
    },
    inEdit: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      localValue: null,
    };
  },

  watch: {
    value() {
      this.processValue();
    },
  },

  methods: {
    createDefaultValue() {

    },
    processValue() {
      if (!isArray(this.value) && !isPlainObject(this.value)) {
        this.localValue = this.value ? clone(this.value) : this.createDefaultValue();
      } else {
        this.localValue = defaults(cloneDeep(this.value), this.createDefaultValue());
      }
    },
    onChange() {
      this.$emit('input', isArray(this.localValue) || isPlainObject(this.localValue)
        ? cloneDeep(this.localValue) : this.localValue);
    },
  },

  created() {
    this.processValue();
  },
}
