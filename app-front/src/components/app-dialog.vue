<template>
  <div>
    <q-dialog persistent v-model="dialog">
      <q-card style="width: 700px; max-width: 100%" class="q-pb-md">
        <q-toolbar class="justify-end">
          <q-btn icon-right="close" v-close-popup dense flat color="primary"/>
        </q-toolbar>

        <q-card-section>
          <div class="text-center text-h5 text-bold text-uppercase">Good news!</div>
          <div class="text-center text-subtitle1 q-mt-md">
            You have <span class="text-primary text-bold text-uppercase">1 cryptobox</span><br>
            <span v-if="wallet.btmtBalance">You can swap your <span class="text-bold text-primary">{{
                wallet.btmtBalance
              }} {{ tokenName }}</span> coins</span>
            <div>You can get <span class="text-bold text-uppercase">50 <span class="text-bold text-primary text-uppercase">{{ stableCoin }} </span> and start game</span></div>
          </div>
        </q-card-section>

        <q-card-section>
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

            <div v-if="wallet.btmtBalance" class="q-mt-md">
              <q-btn
                :label="`Swap ${tokenName} to BUSD`"
                color="primary"
                icon="autorenew"
                class="q-py-sm text-bold"
                unelevated
                outline
                no-caps
                style="width: 300px; max-width: 100%; letter-spacing: 0.5px"
                @click="swapMyToken"
              />
            </div>

            <div class="q-mt-md">
              <q-btn
                :label="`GET 50 ${stableCoin}`"
                color="primary"
                icon="paid"
                class="q-py-sm text-bold"
                unelevated
                outline
                style="width: 300px; max-width: 100%; letter-spacing: 0.5px"
                @click="swapMyToken"
              />
            </div>

          </div>
        </q-card-section>
      </q-card>

    </q-dialog>

    <q-dialog v-model="gameDialog" persistent>
      <game-card/>
    </q-dialog>

    <q-slide-transition>
      <div v-if="wallet.address && !dialog" class="bottom-sidebar">
        <div class="flex full-height items-center justify-center">
          <q-btn
            label="Cryptobox"
            color="primary"
            icon="card_giftcard"
            class="q-py-sm text-bold"
            unelevated
            :size="$q.platform.is.desktop ? 'md' : 'sm'"
            style="letter-spacing: 0.5px"
            @click="gameBoxHandler"
          />

          <q-btn
            :label="`50 ${stableCoin}`"
            color="primary"
            icon="paid"
            class="q-py-sm text-bold q-ml-sm"
            unelevated
            :size="$q.platform.is.desktop ? 'md' : 'sm'"
            outline
            style="letter-spacing: 0.5px"
            @click="swapMyToken"
          />

          <q-btn
            v-if="wallet.btmtBalance"
            :label="`Swap ${tokenName}`"
            color="primary"
            icon="autorenew"
            class="q-py-sm text-bold q-ml-sm"
            unelevated
            no-caps
            :size="$q.platform.is.desktop ? 'md' : 'sm'"
            outline
            style="letter-spacing: 0.5px"
            @click="swapMyToken"
          />
        </div>
      </div>
    </q-slide-transition>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import GameCard from 'components/game/game-card'
import Web3 from 'web3'
import { getMyConnectedWallet } from 'components/wallet/store/actions'

export default {
  name: 'app-dialog',
  components: { GameCard },
  computed: {
    ...mapState('wallet', ['wallet', 'tokenName', 'busdBalance', 'usdcBalance', 'usdtBalance']),
    address () {
      return this.wallet.address
    },
    stableCoin () {
      const usdc = {
        name: 'usdc',
        balance: this.usdcBalance
      }
      const usdt = {
        name: 'usdt',
        balance: this.usdtBalance
      }
      const busd = {
        name: 'busd',
        balance: this.busdBalance
      }
      const arr = [busd, usdc, usdt]

      arr.sort((a, b) => a.balance < b.balance ? 1 : -1)

      return arr[0].name
    }
  },
  data () {
    return {
      dialog: false,
      gameDialog: false
    }
  },
  methods: {
    ...mapActions('wallet', ['swapMyToken']),
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
    }
  },
  watch: {
    address (val) {
      if (val) {
        setTimeout(() => {
          this.dialog = true
        }, 1000)
      }
    }
  }
}
</script>

<style lang="sass">
.bottom-sidebar
  position: fixed
  z-index: 10000
  bottom: 0
  left: 0
  right: 0
  height: 70px
  background: $dark
</style>
