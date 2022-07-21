<template>
  <q-page class="">
    <iframe src="https://owl.games/" :width="iframeStyle.width" :height="iframeStyle.height" style="overflow-x: hidden">
    </iframe>
    <app-dialog />
    <wallet-connect />
  </q-page>
</template>

<script>
import AppDialog from 'components/app-dialog'
import WalletConnect from 'components/wallet/wallet-connect'
export default {
  name: 'PageIndex',
  components: { WalletConnect, AppDialog },
  created () {
    this.$q.dark.set(true)
  },
  computed: {
    iframeStyle () {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  }
}
</script>
