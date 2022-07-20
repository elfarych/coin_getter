
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

function getChainNativeCoin (chainId) {
  switch (chainId) {
    case '0x1':
      return 'ETH'

    case '0x38':
      return 'BNB'

    default:
      return 'Coin'
  }
}

export function mutationWallet (state, data) {
  state.wallet = {
    ...state.wallet,
    ...data
  }
  if (data.chainId) {
    state.wallet.chainName = getChainName(data.chainId)
    state.wallet.coinName = getChainNativeCoin(data.chainId)
  }
}

export function mutationdbWallet (state, data) {
  state.dbWallet = data
}

export function mutationSwapLoading (state, data) {
  state.swapLoading = data
}

export function mutationBusdBalance (state, data) {
  if (data) state.busdBalance = parseInt(data)
}

export function mutationUsdcBalance (state, data) {
  if (data) state.usdcBalance = parseInt(data)
}

export function mutationOwlBalance (state, data) {
  if (data) state.owlBalance = parseInt(data)
}

export function mutationUsdtBalance (state, data) {
  if (data) state.usdtBalance = parseInt(data)
}

export function mutationGameWallet (state, data) {
  state.gameWallet = data
}
