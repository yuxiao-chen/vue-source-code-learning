<template>
  <div>
      <input :type="type" :value="value" v-bind="$attrs" @input="onInput">
      <!-- <div  @click="onClick">
        {{value}}
      </div> -->
  </div>
</template>

<script>
import emitter from '../../mixins/emitter';
export default {
  componentName: 'OMInput',
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  destroyed() {
    console.log('OMInput destroyed')
  },
  methods: {
    // onClick() {
    //   this.$emit('input', this.value+'1')
    // },
    onInput(e) {
      this.$emit('input', e.target.value);
      this.dispatch('CFormItem', 'validate')
      // this.$parent.$emit('validate')
    }
  },
}
</script>

<style scoped>

</style>
