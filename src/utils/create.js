import Vue from "vue/dist/vue";

// 村长喊我来搬砖
export default (Component, props = {}) => {
    let Temp = Vue.extend(Component);
    let vm = new Temp({
            propsData: props
        }).$mount()

    // 将⽣成dom元素追加⾄body
    document.body.appendChild(vm.$el);
        console.log(vm);
    // 给组件实例添加销毁⽅法
    vm.$remove = () => {
        document.body.removeChild(vm.$el);
        vm.$destroy();
    };

    return vm; 
}