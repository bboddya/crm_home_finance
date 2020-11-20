import firebase from 'firebase/app'

export default {
    actions: {
        async fetchCategories({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {} //возвращаем новый объек с функцией value
                return Object.keys(categories).map(key => ({...categories[key], id: key})) // перебралди обект через keys, затем собрали и вернули новый через .map, в которо развернули объект categories и добавили id
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCategoryById({commit, dispatch}, id) {
            try {
                const uid = await dispatch('getUid')
                const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {} //возвращаем новый объек с функцией value
                return {...category, id}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateCategory({commit, dispatch}, {title, limit, id}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit}) //обновление данных категории
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const uid = await dispatch('getUid') //добавление данных в определенного юзера
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit}) //database добавит новые данные в попку categories (если папка отсутствует, то он ее создаст)
                return {title, limit, id: category.key}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}