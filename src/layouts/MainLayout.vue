<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar
        :value="isOpen"
        :key="locale"
      /><!-- key - это хак,чтобы динамически обновлялся sidebar -->

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" :key="locale + '1'">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'CreateNewRecord'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true, // если нет данных, то показывается loading
  }),
  components: {
    Navbar,
    Sidebar,
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      //проверка возвращает объект и если он пустой, то делается запрос
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false //если данные загрузились, то loading выключается
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так!') // Вывод сообщения через код ошибки(на случай, если кода не будет, то выведется замена сообщения)
    },
  },
}
</script>