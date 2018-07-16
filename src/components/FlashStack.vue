<template>
  <div id="alert-stack">
    <transition-group name="stack">
    <flash
      v-for="alert in alerts"
      :message="alert.message"
      :level="alert.level"
      :nonce="alert.nonce"
      :key="alert.nonce"
      :delay=3000
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

<style lang="css" rel="stylesheet/css" scoped>
.stack-enter-active,
.stack-leave-active {
  transition: all 1s;
}
.stack-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

#alert-stack {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
}

@media (min-width: 768px) {
  #alert-stack {
    width: 32rem;
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    left: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}

.alert {
  width: 100%;
  display: block;
  padding: 0.5em;
  margin-top: 0.5em;
}

@media (min-width: 768px) {
  .alert {
    position: relative;
    padding: 1em;
    margin-top: 1em;
    border-radius: .25rem;
    font-size: 1.125rem;
  }
}

.alert.success {
  background-color: #e3fcec;
  color: #1f9d55;
  border: 2px solid #51d88a;
}

.alert.success a {
  color: #1f9d55;
}

.alert.success a:hover {
  color: #1a4731;
}

.alert.info {
  color: #2779bd;
  background-color: #eff8ff;
  border: 2px solid #64d5ca;
}

.alert.info a {
  color: #2779bd;
}

.alert.info a:hover {
  color: #1c3d5a;
}

.alert.warning {
  background-color: #fcfbeb;
  color: #f2d024;
  border: 2px solid #faad63;
}

.alert.warning a {
  color: #f2d024;
}

.alert.warning a:hover {
  color: #684f1d;
}

.alert.danger {
  background-color: #fcebea;
  color: #cc1f1a;
  border: 2px solid #ef5753;
}

.alert.danger a {
  color: #cc1f1a;
}

.alert.danger a:hover {
  color: #621b18;
}

</style>
