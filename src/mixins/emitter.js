/**
 * 广播：自上而下传播
 * @param {*} componentName 
 * @param {*} eventName 
 * @param {*} params 
 */
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
      var name = child.$options.componentName;
  
      if (name === componentName) {
        child.$emit.apply(child, [eventName].concat(params));
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]));
      }
    });
  }
  export default {
    methods: {
    /**
     * 自下而上、冒泡查找
     * @param {*} componentName 
     * @param {*} eventName 
     * @param {*} params 
     */
      dispatch(componentName, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.componentName;
  
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
  
          if (parent) {
            name = parent.$options.componentName;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  