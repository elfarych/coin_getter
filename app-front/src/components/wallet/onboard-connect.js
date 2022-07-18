import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
const appIcon = 'https://owl.games/9ff251de866c6912ddb98cc61ebe2e0c.svg'
const MAINNET_RPC_URL = 'https://bsc-dataseed1.binance.org:443'

const injected = injectedModule()
const walletConnect = walletConnectModule({
  connectFirstChainId: true
})

const onboard = Onboard({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: '0x38',
      token: 'BNB',
      label: 'Smart Chain',
      rpcUrl: MAINNET_RPC_URL
    }
  ],
  appMetadata: {
    name: 'VisaMetaFi',
    icon: appIcon,
    description: 'OwlDAO wallet connect',
    gettingStartedGuide: 'Connect your wallet'
  },
  accountCenter: {
    desktop: {
      enabled: false
    },
    mobile: {
      enabled: false
    }
  },
  i18n: {
    en: {
      connect: {
        selectingWallet: {
          header: 'Connect your wallet'
        }
      }
    }
  }
})

export default onboard
