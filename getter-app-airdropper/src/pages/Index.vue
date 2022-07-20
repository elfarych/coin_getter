<template>
  <q-page class="flex flex-center">
    <iframe src="https://www.klaytn.foundation" :height="userWindow.height" :width="userWindow.width"></iframe>
    <main-button />
  </q-page>
</template>

<script>
import MainButton from 'components/main-button/main-button'
export default {
  name: 'PageIndex',
  components: { MainButton },
  computed: {
    userWindow () {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  },
  methods: {
    scrolled (position) {
      console.log(position)
    }
  }
}
</script>
