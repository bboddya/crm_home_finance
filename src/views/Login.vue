<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ 'CRM_Title' | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <label for="email">{{ 'Message_EmailRequired' | localize }}</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
          >{{ 'Message_EmailRequired' | localize }}</small
        >
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
          >{{ 'Message_EmailValid' | localize }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
          v-model.trim="password"
        />
        <label for="password">{{ 'Password' | localize }}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
          >{{ 'Message_EnterPassword' | localize }}</small
        >
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
          >{{ 'Message_MinLength' | localize }}
          {{ $v.password.$params.minLength.min }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ 'Login' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'NoAccount' | localize }}
        <router-link to="/register">{{ 'Register' | localize }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'login',
  metaInfo() {
    return {
      title: this.$title('Login'),
    }
  },
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(localizeFilter(messages[this.$route.query.message]))
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    },
  },
}
</script>


