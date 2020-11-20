<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      custom
      v-slot="{ navigate, isActive }"
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      exact
    >
      <li @click="navigate" :class="[isActive && 'active']" role="link">
        <a class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>


<script>
import localizeFilter from '@/filters/localize.filter'
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: localizeFilter('Menu_Bill'), url: '/' },
      { title: localizeFilter('Menu_History'), url: '/history' },
      { title: localizeFilter('Menu_Planning'), url: '/planning' },
      { title: localizeFilter('Menu_NewRecord'), url: '/record' },
      { title: localizeFilter('Menu_Categories'), url: '/categories' },
    ],
  }),
}
</script>