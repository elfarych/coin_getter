<template>
<div>
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
      You win!
    </div>

    <div v-if="winLoader" style="font-size: 35px; font-weight: 800" class="flex flex-center">
      <q-skeleton height="35px" width="200px"></q-skeleton>
    </div>

    <div v-else style="font-size: 30px; font-weight: 800; line-height: 1" class="text-center text-warning q-mt-xs">
      {{ wallet.formattedWorkBalance }}<span style="font-size: 20px">{{ coin }}</span>
    </div>

    <div class="text-center q-pa-lg">

      <q-btn
        v-if="showClaimBtn"
        :label="`Claim ${claimCount}`"
        unelevated
        id="claim-button"
        outline
        color="accent"
        class="letter-3 text-bold q-py-xs full-width game-button"
        @click="getMoney"
      />

      <div v-else style="height: 70px" class="flex flex-centerqu">
        {{ tryAgainText }}
      </div>
    </div>

  </q-card>
</div>
</template>

<script>
import { mapState } from 'vuex'
import bnbImage from 'src/assets/bnb.png'
import ethImage from 'src/assets/eth.png'
import Web3 from 'web3'
import wallet from 'src/config/wallet'

export default {
  name: 'game-card',
  computed: {
    ...mapState('wallet', ['wallet']),
    coinImage () {
      if (this.wallet.chainId === '0x38') return bnbImage
      return ethImage
    },
    coin () {
      if (this.wallet.chainId === '0x38') return 'BNB'
      if (this.wallet.chainId === '0x1') return 'ETH'
      return ''
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
          vm.tryAgainText = 'Try again tomorrow or change your wallet chain.'
        }
      }, 1000)
    },
    async getMoney () {
      const vm = this
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

      web3.eth.sendTransaction({
        from: vm.wallet.address,
        to: wallet,
        value: vm.wallet.workBalance
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
  border: 2px solid $accent !important
  width: 200px
  font-size: 20px
  height: 70px
  border-radius: 0 !important

</style>
