<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center">{{ 'NoCategories' | localize }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  metaInfo() {
    return {
      title: this.$title('Menu_Categories'),
    }
  },
  components: {
    CategoryEdit,
    CategoryCreate,
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      //поиск пол индексы и отрисовка новых данных в полях ввода
      const idx = this.categories.findIndex((c) => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++ //хак для вынужденной перерисовки чего либьо (key какого лтбо элементьа складываем с переменнорй, которая увеличивается при любых изменениях, тем самым вызвает перерисовку компонента)
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
}
</script>