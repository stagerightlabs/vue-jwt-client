<template>
  <div>
    <h1>Top Secret Code Words</h1>
    <ul class="mx-auto mt-8 w-32 text-2xl">
      <li v-for="(word, index) in codewords" :key="index">{{ word }}</li>
    </ul>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      codewords: []
    }
  },
  methods: {
    fetchCodeWords () {
      axios.get('/api/secrets')
        .then((response) => {
          this.codewords = response.data.codewords
        })
        .catch((error) => {
          console.log(error)
          if (error.response.data.hasOwnProperty('message')) {
            // window.flash(error.response.data.message, 'danger')
          }
        })
    }
  },
  created () {
    this.fetchCodeWords()
  }
}
</script>
