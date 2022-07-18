<template>
<div>
  <q-dialog persistent v-model="dialog">
    <q-card style="width: 500px; max-width: 100%">
      <q-card-section>
        <div class="text-h6 text-bold text-center q-pt-sm">
          Connect wallet to continue
        </div>

        <div class="q-mt-md">
          <q-btn
            label="Connect wallet"
            icon-right="account_balance_wallet"
            color="primary"
            class="full-width q-py-sm text-subtitle1 text-bold"
            v-close-popup
            unelevated
            @click="connectWallet"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import onboard from './onboard-connect'

export default {
  name: 'wallet-connect',
  computed: {
    ...mapState('wallet', ['wallet'])
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapActions('wallet', ['setWallet']),
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
        this.connectWallet()
      }, 8888)
    }
  }
}
</script>

<style scoped>

</style>
