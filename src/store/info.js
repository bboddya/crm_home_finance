import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    getters: {
        info: s => s.info
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {locale: state.info.locale /* Для вывода другого языка на страницах login & register */} //для того, чтобы не кэшировал logout, чтобы сессии пользователей не пересекались. На случай мы будем заходить с разных аккаунтов
        }

    },
    actions: {
        async updateInfo({dispatch, commit, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUid') // получение uid пользователя
                const updateData = {...getters.info, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(updateData)
                commit('setInfo', updateData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchInfo({dispatch, commit}) {
           try {
            const uid = await dispatch('getUid') // получение uid пользователя
            const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val() //получение инвормации о пользователи из базы данных
            commit('setInfo', info)
           } catch (e) {
               commit('setError', e)
               throw e
           }
        }
    }
}