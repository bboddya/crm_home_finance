import localizeFilter from '@/filters/localize.filter'

//Плагин для добавления названия приложения ко всем страницам во вкладках
export default {
    install(Vue) {
        Vue.prototype.$title = function(titleKey) {
            const appName = process.env.VUE_APP_TITLE
            return `${localizeFilter(titleKey)} | ${appName}`
        }
    }
}