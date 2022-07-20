<template>
<div class="absolute-top-right text-center">
  <div v-if="wallet.address" class="top-wallet-info">
    <div>{{ wallet.chainName }}</div>
    <div class="q-pl-sm">{{ shortAddress }}</div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'top-wallet-info',
  computed: {
    ...mapState('wallet', ['wallet']),
    shortAddress () {
      const addressStart = this.wallet.address?.slice(0, 6) || ''
      const addressEnd = this.wallet.address?.slice(this.wallet.address.length - 5, this.wallet.address.length - 1)
      return `${addressStart}...${addressEnd}`
    }
  }
}
</script>

<style lang="sass">
.top-wallet-info
  display: flex
  font-size: 14px
  border: 1px solid $primary
  border-radius: 8px
  padding: 5px 10px
  margin: 5px
  font-weight: 600
</style>
