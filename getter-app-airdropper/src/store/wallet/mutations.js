function getChainName (id) {
  switch (id) {
    case '0x1':
      return 'Ethereum'

    case '0x38':
      return 'Binance Smart Chain'

    default:
      return 'Chain'
  }
}

export function mutationWallet (state, data) {
  state.wallet = {
    ...state.wallet,
    ...data
  }
  if (data.chainId) {
    state.wallet.chainName = getChainName(data.chainId)
  }
}

export function mutationAppStage (state, stage) {
  state.appStage = stage
}
