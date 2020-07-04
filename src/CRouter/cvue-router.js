let KVue;
class CVueRouter {
    constructor(options){
        this.$options = options;

        // 响应式数据
        const initial = window.location.hash.slice(1) || '/'
        KVue.util.defineReactive(this, 'current', initial)
        
        window.addEventListener('hashchange', () => this.onHashCHange())
        window.addEventListener('load', () => this.onHashCHange())

         // 缓存路由映射关系
        this.routeMap = {}
        this.$options.routes.forEach(route => {
            this.routeMap[route.path] = route
        });
    }
    onHashCHange = ()=> {
        this.current = window.location.hash.slice(1)
        console.log(this.current)
    }
    
}

/**
 * vue插件注册方法
 * @param {*} Vue vue的构造函数
 */
CVueRouter.install = function(Vue) {
    KVue = Vue
    Vue.mixin({
        beforeCreate() {
            // 组件实例话时执行
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        },
    })
    // 注册link view
    Vue.component('CVueRouterLink', {
        props: {
            to: String
        },
        render(h) {
            return h('a', {
                attrs: {
                    href: '#'+this.to
                },
            },
            this.$slots.default
            )
        },
    })
    Vue.component('CVueRouterView', {
        render(h) {
            const { routeMap, current } = this.$router
            const comp = routeMap[current] ? routeMap[current].component : null;

            return h(comp)
        },
    })
}
export default CVueRouter