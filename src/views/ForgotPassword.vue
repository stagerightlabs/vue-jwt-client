<template>
  <div>
    <h1>Forgot Password</h1>
    <form class="w-full max-w-sm mx-auto">
      <div class="md:flex md:items-baseline mb-6">
        <div class="md:w-1/3">
          <label class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Email
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-grey-lighter appearance-none border-2 border-grey-lighter focus:border-purple rounded w-full py-2 px-4 text-grey-darker"
            id="inline-full-name"
            type="email"
            v-model="email"
          >
          <p class="text-red text-sm mt-1" v-if="hasValidationError('email')">{{ getValidationError('email') }}</p>
        </div>
      </div>
      <div class="md:flex md:items-baseline">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 rounded"
            type="button"
            @click.prevent="sendRequest">Help Me!
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import bus from '@/bus'
import axios from '@/axios'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      email: ''
    }
  },
  methods: {
    sendRequest () {
      this.clearFormErrors()
      axios.post('/api/password/email', {
        email: this.email
      }).then(() => {
        this.$router.push({name: 'Login'})
        bus.$emit('flash', 'If we find an account for that email address, a reset link will be sent.', 'success')
      }).catch(() => {
        // see axios configuration
      })
    },
    ...mapMutations([
      'clearFormErrors'
    ])
  },
  computed: {
    ...mapGetters([
      'hasValidationError',
      'getValidationError'
    ])
  }
}
</script>
