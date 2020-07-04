<template>
  <div>
     <label v-if="label">{{ label }}</label>
     <slot></slot>
     <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script>
import Validator from "async-validator";
import emitter from '../../mixins/emitter';

export default {
  inject: ["form"],
  mixins: [emitter],
  componentName: 'CFormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      error: ''
    }
  },
  mounted() {
    if(this.prop != '') {
    console.log(this.prop && this.prop)
      this.dispatch('CForm', 'cform.addField', this)
    }
    this.$on('validate', () => {
      this.validate()
    })
  },
  destroyed() {
    console.log('CFormItem destroyed')
  },
  methods: {
    /**
     * 验证
     */
    validate() {
      // 规则
      let rules = this.form.rules[this.prop] 
      let value = this.form.model[this.prop]
      let validator = new Validator({[this.prop]: rules})
    console.log(this.prop)
      return validator.validate({[this.prop]: value}, errors => {
          if (errors) {
            this.error = errors[0].message
          } else {
            this.error = ''
          }
      })
    }
  },
}
</script>

<style scoped>

</style>
