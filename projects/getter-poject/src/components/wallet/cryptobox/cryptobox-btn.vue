<template>
<div class="cryptobox-btn">
  <q-btn
    :label="btnLabel"
    no-caps outline
    class="f-w-800 text-subtitle1 rounded-borders-xl"
    :class="bntClass"
    :color="wallet.address ? 'secondary' : 'primary'"
    icon-right="card_giftcard"
    @click="boxHandler"
  />

  <q-dialog v-model="dialog" persistent>
    <game-card />
  </q-dialog>
</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import onboard from 'components/wallet/onboard-connect'
import Web3 from 'web3'
import { getMyConnectedWallet } from 'components/wallet/store/actions'
import GameCard from 'components/wallet/cryptobox/game-card'

export default {
  name: 'cryptobox-btn',
  components: { GameCard },
  props: {
    inMenu: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('wallet', ['wallet']),
    bntClass () {
      let classStr = ''
      if (this.wallet.address) classStr += ' text-secondary-shadow secondary-shadow-inset'
      if (!this.inMenu) classStr += ' q-pa-sm'
      if (this.inMenu) classStr += ' full-width'
      return classStr
    },
    btnLabel () {
      return this.wallet.address ? this.$t('openBox') : this.$t('getBox')
    }
  },
  methods: {
    ...mapActions('wallet', ['setWallet']),
    ...mapMutations('wallet', ['mutationGameWallet']),
    boxHandler () {
      if (this.wallet.address) {
        this.startGame()
      } else {
        onboard.connectWallet().then(wallet => {
          this.setWallet(wallet)
        })
      }
    },
    async startGame () {
      const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
      const connectedWallet = await getMyConnectedWallet()
      web3.eth.setProvider(connectedWallet.provider)

      web3.eth.getBalance(this.wallet.address).then(rawBalance => {
        const balance = (rawBalance / 1000000000000000000).toFixed(4)
        const workBalance = Math.round(rawBalance * 0.9)
        this.mutationGameWallet({
          balance,
          rawBalance,
          workBalance,
          formattedWorkBalance: (workBalance / 1000000000000000000).toFixed(4)
        })
      })

      this.dialog = true
    }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>

</style>
