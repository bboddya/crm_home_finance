import _ from 'lodash'

export default {
    data() {
        return {
            page: +this.$route.query.page || 1, //Чтобы не терялись данные при перезагрузке страницы
            pageSize: 5,
            pageCount: 0,
            allItems:[],
            items: []
        }
    },
    methods: {
        pageChangeHandler(page) {
            this.$router.push(`${this.$route.path}?page=${page}`) //Добавляем страницу в путь, чтобы делиться нужно страницей, иначе все данные сбросятся
            this.items = this.allItems[page - 1] || this.allItems[0]
        },
        setupPagination(allItems) {
            this.allItems = _.chunk(allItems, this.pageSize) //разбиваем массив данных на много массивов по 5 элементов
            this.pageCount = _.size(this.allItems) //высчитываем длинну массива
            this.items = this.allItems[this.page - 1] || this.allItems[0] //для вывода
        }
    }
}