<template>
  <q-btn
    :label="$t('getAirdrop')"
    class="f-w-800 q-mt-lg q-pa-sm rounded-borders-xl full-width warning-btn"
    no-caps
    color="warning"
    flat
    unelevated
    style="font-size: 18px"
    :loading="swapLoading"
    @click="getAirDrop"
  />
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'get-airdrop-btn',
  computed: {
    ...mapState('wallet', ['swapLoading'])
  },
  methods: {
    ...mapActions('wallet', ['getAirDrop'])
  }
}
</script>

<style scoped>

</style>
