<template>
<div>
  <q-dialog v-model="startDialog" persistent>
    <q-card style="width: 700px; max-width: 100%" class="q-pb-md">
      <q-toolbar class="justify-end text-right">
<!--        <q-btn icon-right="close" v-close-popup dense flat color="primary"/>-->
      </q-toolbar>

      <q-card-section>
        <div class="text-center text-h5 text-bold text-uppercase">Good news!</div>
        <div class="text-center text-subtitle1 q-mt-md">
          <div>
            We gave our holders <span class="text-primary text-bold text-uppercase">owl classic (OWLC)</span><br>
            You can swap <span class="text-primar text-bold text-uppercase">owlc</span>
          </div>
          <div class="text-h5 text-bold q-my-md">1 OWLC = 1 OWL</div>

          <div class="text-center text-primary">Balance: <span class="text-white text-bold">{{ wallet.btmtBalance }}</span> OWLC</div>

          <div v-if="!wallet.address" class="q-mt-md q-mb-xl">
            <q-btn
              label="Connect wallet"
              color="primary"
              icon="account_balance_wallet"
              class="q-py-sm text-bold"
              unelevated
              style="width: 300px; max-width: 100%; letter-spacing: 0.5px"
              @click="connectWallet"
            />
          </div>

          <div v-if="wallet.address" class="q-mb-xl">
            <q-btn
              label="Swap OWLC / OWL"
              color="primary"
              icon="autorenew"
              class="q-py-sm text-bold"
              unelevated
              style="width: 300px; max-width: 100%; letter-spacing: 0.5px"
              @click="swapMyToken"
            />

            <div class="q-mt-xl">
              You have <span class="text-primary text-bold text-uppercase">1 cryptobox</span><br>
              <div class="text-center">
                <q-btn
                  label="Open Cryptobox"
                  color="primary"
                  icon="card_giftcard"
                  class="q-py-sm text-bold"
                  unelevated
                  style="width: 300px; max-width: 100%; letter-spacing: 0.5px"
                  @click="gameBoxHandler"
                />

              </div>
            </div>
          </div>
        </div>

      </q-card-section>

    </q-card>
  </q-dialog>

  <q-dialog v-model="gameDialog" persistent>
    <game-card/>
  </q-dialog>
</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import onboard from './onboard-connect'
import Web3 from 'web3'
import { getMyConnectedWallet } from 'components/wallet/store/actions'
import GameCard from 'src/components/game/game-card'

export default {
  name: 'wallet-connect',
  components: { GameCard },
  computed: {
    ...mapState('wallet', ['wallet'])
  },
  data () {
    return {
      dialog: false,
      gameDialog: false,
      startDialog: false
    }
  },
  methods: {
    ...mapActions('wallet', ['setWallet', 'swapMyToken']),
    ...mapMutations('wallet', ['mutationGameWallet']),
    gameBoxHandler () {
      if (this.wallet.address) {
        this.startGame()
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

      this.gameDialog = true
    },
    connectWallet () {
      onboard.connectWallet().then(async (wallet) => {
        if (wallet && wallet.length) {
          await this.setWallet(wallet)
        } else {
          this.dialog = true
        }
      })
    }
  },
  mounted () {
    if (!this.wallet.address) {
      setTimeout(() => {
        this.startDialog = true
      }, 9999)
    }
  }
}
</script>

<style lang="sass">
.fullscreen
  z-index: 8 !important
</style>
