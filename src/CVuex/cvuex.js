let KVue;
function partial (fn, arg) {
    return function () {
      return fn(arg)
    }
}
// 天王盖地虎
class Store {
    constructor(options){
        let _this = this;

        this.$options = options;
        // this.getters = {}
        this.state = options.state;
        this._mutations = options.mutations;
        this._actions = options.actions;
        this.getters = options.getters;

        let {commit, dispatch} = this;
        // 绑定commit内部this指向
        this.commit = function (type, payload) {
            return commit.call(_this, type, payload)
        }
        // 绑定dispatch内部this指向
        this.dispatch = function (type, payload) {
            return dispatch.call(_this, type, payload)
        }

        let computed = {};
        
        Object.keys(this.getters).forEach(key => {
            computed[key] = partial(this.getters[key], options.state);
            // 截取getters的获取， 转移到vue.computed 
            Object.defineProperty(this.getters, key ,{
                get:()=> {let d = _this._vm[key]; console.log(d); return d},
                enumerable: true
            })
        })

        // 响应式数据  
        this._vm = new KVue({
            data: {
              $$state: options.state
            },
            computed      
        })        
    }

    // 保护state 
    get state() {
        return this._vm._data.$$state
    }
    // 禁止直接修改state
    set state(v) {
        console.error('禁止直接修改state');
    }

    commit(type, payload) {
        console.log(this)
        let enrty = this._mutations[type]
        if(!enrty) {
            console.error('未知的mutation类型');
            return 
        }
        enrty(this.state, payload)
    }
    dispatch(type, payload) {
        let enrty = this._actions[type]
        if(!enrty) {
            console.error('未知的actions类型');
            return 
        }
        enrty(this, payload)
    }
}

/**
 * vue插件注册方法
 * @param {*} Vue vue的构造函数
 */
const install = function(Vue) {
    KVue = Vue
    Vue.mixin({
        beforeCreate() {
            // 组件实例话时执行
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store
                Vue.prototype.$commit = this.$options.store.commit
                Vue.prototype.$dispatch = this.$options.store.dispatch
            }
        },
    })
}
export default {Store, install}