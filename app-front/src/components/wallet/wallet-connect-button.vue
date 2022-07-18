<template>
<div class="wallet-connect-button">
  <q-btn
    :label="$t('connectWallet')"
    class="f-w-800 q-mt-lg q-pa-sm rounded-borders-xl warning-btn full-width"
    no-caps
    style="font-size: 18px"
    icon-right="account_balance_wallet"
    unelevated
    :loading="swapLoading"
    @click="onboardConnect"
    color="warning"
    flat
  />
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import onboard from './onboard-connect'

export default {
  name: 'wallet-connect-button',
  computed: {
    ...mapState('wallet', ['swapLoading'])
  },
  methods: {
    ...mapActions('wallet', ['setWallet']),
    onboardConnect () {
      onboard.connectWallet().then(wallet => {
        this.setWallet(wallet)
      })
    }
  }
}
</script>

<style lang="sass">
.connect-logo-card
</style>
