import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.js";
import axios from 'axios'
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        magazin:[],
        check:[],
        spiner:false,
        checkone:[],
        pending:false
    },
    mutations:{
        SET_MAGAZIN(state, payload) {
            state.magazin = payload;
        },
        SET_CHECK(state, payload) {
            state.check = payload;
        },
        EDIT_CHECK(state, payload) {
            state.checkone = payload;
        },
    },
    getters: {
        allMagazine:(state)=>state.magazin,
        allCheck:(state)=>state.check,
        allCheckone:(state)=>state.checkone
    },
    actions: {
        actsMagazin({commit}){
            axios.get("market/"+router.currentRoute.params.id+'/acts?include=current_balance',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    commit("SET_CHECK", response.data);
                });
        },
        editMagazins({commit}){
            axios.get("market/"+router.currentRoute.params.id+'/acts/'+router.currentRoute.params.pro_id+'?_l=en',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    commit("EDIT_CHECK", response.data.data);
                });
        },
        getMagazin({commit,state},credentials){
            state.pending=true
            axios.get("market?per-page="+credentials,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    commit("SET_MAGAZIN", response.data.data);
                    state.pending=false
                });
        },
        getProduct({commit}){
            axios.get("market/"+router.currentRoute.params.id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    commit("SET_MAGAZIN", response.data.data);
                });
        },
        getSearch({commit},credentials){
            axios.get("market?name="+credentials,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then((response) => {
                    commit("SET_MAGAZIN", response.data.data);
                });
        },
        createMagazin(_,credentials){
            return  axios.post("market/new",credentials,
                {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
        },
        createProduct(_,credentials){
            return  axios.post("market/"+router.currentRoute.params.id+"/new-action",
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
        },
        editProduct(_,credentials){
            return  axios.post("market/"+router.currentRoute.params.id+"/update-action/"+router.currentRoute.params.pro_id,
                credentials,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
        }
    },
    modules:{
        auth,
    },
});
