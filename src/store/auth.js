import axios from 'axios'
import router from '../router'

export default {
    namespaced: true,
    state: {
        token: 'abc',
        user: [],
        menu: null,
        filter: [],
        fineTable: [],
        email:'',
        selects:[],
        message:false,
        authS:false,
        errorss:''
    },
    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        },

    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, data) {
            state.user = data
        }
    },

    actions: {
        businessProfiles({state}) {

            router.push('/login')
            state.user.push({
                "busenismen":10
            })
        },
        async Buy({state}, credentials) {
            state.selects=credentials
            router.push('/zone/'+state.selects.zone_id+'/spaces/'+state.selects.id+'/reservationtime')
        },
        async Orders({state}, credentials) {
            router.push('reservation/order/?people_count='+credentials)
            console.log(state.selects)
        },

        async signUp({state}, credentials) {
            let response = await axios.post('user/register', credentials)
                .then(res => {
                    state.email=res.data
                    router.push({ path: 'user/confirm-email' })

                })


            console.log(response)
        },
        async confirmEmail({state, dispatch }, credentials) {

            console.log(credentials)
            let response = await axios.post('user/confirm-email', {
                "email":state.email,
                "code":credentials.code
            })
            dispatch('attempt', response.data.data.token)

                .then(() => {
                    router.push({ path: '/' })
                })

        },
        async ForgotPassword(_, credentials) {

            console.log(credentials)
            let response = await axios.post('user/forgot-password',credentials)
                .then(() => {
                    router.push({ path: '/' })
                })
            console.log(response)

        },
        async userUpdate(_, credentials) {
            let response = await axios.post('user/update',
                credentials, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
            )
                .then(() => {
                    router.push({ path: '/' })
                })
            console.log(response)
        },
        async signIn({ dispatch ,state}, credentials) {
            let response = await axios.post('user/login', credentials)
            dispatch('attempt', response.data.data.token)
                .then(() => {
                    router.push({ path: '/' })
                    state.authS=false
                })
                .catch(errors=>{
                    console.log(errors.response)
                    state.authS=false
                })
        },
        async attempt({ commit, state }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }
            if (!state.token) {
                return
            }
            try {
                let response = await axios.get('user/get-me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                commit('SET_USER', response.data)
            }
            catch (e) {
                commit('SET_USER', null),
                    commit('SET_TOKEN', null)

                state.authS=false
            }
        },
        signOut({ commit }) {
            commit('SET_USER', null),
                commit('SET_TOKEN', null)

        }

    },
}
