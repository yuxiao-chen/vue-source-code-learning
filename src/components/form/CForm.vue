<template>
  <div>
     <slot></slot>
  </div>
</template>

<script>
import emitter from '../../mixins/emitter';
export default {
  provide() {
    return {
      form: this 
    };
  },
  componentName: 'CForm',
  mixins: [emitter],
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  data() {
    return {
      error: '',
      fields: []
    }
  },
  mounted() {
    // fields
    this.$on('cform.addField', (field)=> {
      if(field) {
        this.fields.push(field)
      }
    })
  },
  methods: {
    validate(cb) {
      // 执行全部子元素验证
      this.broadcast('CFormItem', 'validate')
      console.log(this.fields)
      let vTasks = this.fields.map(e => e.validate())
      Promise.all(vTasks).then(() => {
        cb(true)
      }).catch(()=>{
        cb(false)
      })
    }
  },
}
</script>

<style scoped>

</style>
