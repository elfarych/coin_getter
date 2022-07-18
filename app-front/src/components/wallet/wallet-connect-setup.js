import WalletConnectProvider from '@walletconnect/web3-provider'

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  infuraId: '41ad9ed3e14d4eb8817675f8d48fe96b',
  qrcode: true,
  qrcodeModalOptions: {

  }
})

export default provider
