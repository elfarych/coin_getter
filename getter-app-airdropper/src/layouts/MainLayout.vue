<template>
  <q-layout view="lHh Lpr lFf">
    <top-wallet-info />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import TopWalletInfo from 'components/top-wallet-info'
export default {
  name: 'MainLayout',
  components: {
    TopWalletInfo
  },
  data () {
    return {
    }
  }
}
</script>
