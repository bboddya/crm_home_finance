import firebase from 'firebase/app'

export default {
    actions: {
        async login({commit},{email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e) //вызов мутациия error
                throw e
            }
        },
        async register({commit, dispatch},{email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid') //вызвали dispatch, чтобы после создания пользователя сразу обратиться к следующему action
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name
                }) //занесение user в базу и добавление начальных данных в его аккаунт
            } catch (e) {
                commit('setError', e) //вызов мутациия error
                throw e
            }
        },
        getUid() {
            const user = firebase.auth().currentUser //обращение по id
            return user ? user.uid : null//если currentUser === 0, то будетошибка, поэтому делается проверка
        },
        async logout({commit}) {
            await firebase.auth().signOut() //очистка данных при выходе
            commit('clearInfo') //когда logout? чистим mutation
        },
    },
}