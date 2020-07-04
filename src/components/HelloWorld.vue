<template>
  <div class="hello">
    <span>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab exercitationem animi eaque? Rerum exercitationem doloremque pariatur explicabo ipsam placeat dolore, consectetur sunt ullam excepturi iure aliquam quos, quas dolorum nam.
    </span>
    <div>
      <span style="color: red">{{msg}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  destroyed() {
    console.log('HelloWorld destroyed')
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
