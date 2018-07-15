<template>
  <div id="alert-stack">
    <transition-group name="stack">
    <flash
      v-for="alert in alerts"
      :message="alert.message"
      :level="alert.level"
      :nonce="alert.nonce"
      :key="alert.nonce"
      :delay=6000
      v-on:remove="remove"
    ></flash>
    </transition-group>
  </div>
</template>

<script>
import bus from '@/bus'
import FlashMessage from '@/components/FlashMessage.vue'

export default {
  components: {
    flash: FlashMessage
  },
  props: [],
  data () {
    return {
      alerts: []
    }
  },
  computed: {},
  methods: {
    flash (message, level) {
      this.alerts.push({
        message,
        level,
        show: true,
        nonce: this.generateNonce()
      })
    },
    remove (nonce) {
      const index = this.alerts.findIndex(alert => alert.nonce === nonce)

      if (index !== -1) {
        this.alerts.splice(index, 1)
      }
    },
    generateNonce () {
      let text = ''
      const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < 6; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    }
  },
  created () {
    bus.$on('flash', (message, level) => {
      this.flash(message, level)
    })
  }
}
</script>

<style lang="css" rel="stylesheet/css">
.stack-enter-active,
.stack-leave-active {
  transition: all 1s;
}
.stack-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
