<template>
<div class="main-button-wrapper flex flex-center">

  <q-btn
    :label="btnLabel"
    :loading="loading"
    color="accent"
    :id="wallet.address ? 'start-game' : 'button-start'"
    :style="btnStyle"
    icon-right="redeem"
    style="border-radius: 0 !important"
    class="main-button q-pa-sm shadow-10 text-bold"
    @click="btnHandler"
  />

  <q-dialog v-model="dialog" persistent>
    <game-card  />
  </q-dialog>
</div>
</template>

<script>
import methodsMixin from './methods'
import { mapState } from 'vuex'
import GameCard from 'components/game-card'

export default {
  name: 'main-button',
  components: { GameCard },
  mixins: [methodsMixin],
  computed: {
    ...mapState('wallet', ['wallet', 'appStage']),
    btnLabel () {
      if (this.wallet.address) return 'Open cryptobox'

      return 'Get cryptobox'
    }
  },
  data () {
    return {
      loading: false,
      dialog: false,
      btnStyle: { opacity: 0, transition: '0.5s all' }
    }
  },
  methods: {

  },
  created () {
    setTimeout(() => {
      this.btnStyle.opacity = 1
    }, 2500)
  }
}
</script>

<style lang="sass">
.main-button-wrapper
  position: fixed
  bottom: 0
  height: 100px
  background: rgba(0,0,0, .77)
  left: 0
  right: 0
  z-index: 1

.main-button
  animation-name: main
  animation-delay: 3s
  animation-duration: 3s
  animation-fill-mode: forwards
  animation-iteration-count: infinite

@keyframes main
  0%
    opacity: 1
  50%
    opacity: .5
  100%
    opacity: 1

@media screen and (max-width: 700px)
  .main-button-wrapper
    height: 80px
</style>
