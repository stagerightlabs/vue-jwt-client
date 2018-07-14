<template>
  <div class="alert" :class="level" role="alert" v-show="show">
    <div class="dismiss" @click="dismiss">
      <icon name="times" class="float-right cursor-pointer mx-2"></icon>
    </div>
    {{ body }}
  </div>
</template>

<script>
import 'vue-awesome/icons/times'

export default {
  props: ['message', 'level', 'nonce', 'delay'],
  data () {
    return {
      body: '',
      type: 'info',
      show: true
    }
  },
  methods: {
    dismiss () {
      this.show = false
      this.$emit('remove', this.nonce)
    }
  },
  created () {
    this.body = this.message

    if (this.delay > 0) {
      setTimeout(() => {
        this.dismiss()
      }, this.delay)
    }
  }
}
</script>
