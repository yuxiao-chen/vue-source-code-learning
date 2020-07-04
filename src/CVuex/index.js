import Vue from 'vue'
import Cvuex from './cvuex'
Vue.use(Cvuex);
const store = new Cvuex.Store({
    state: {
        boysTotal: 0,
        girlsTotal: 0,
    },
    mutations: {
        addBoy(state) {
            state.boysTotal++;
        },
        addGirls(state, num) {
            state.girlsTotal =  num;
            console.log(state.girlsTotal)
        }
    },
    actions: {
        asyncAddGirl({state, commit}) {
            setTimeout(()=>{
                commit('addGirls', state.girlsTotal + 2);
            }, 1000)
        }
    },
    getters: {
        peopleTotal(state) {
            return state.boysTotal + state.girlsTotal
        }
    }
});
export default store;