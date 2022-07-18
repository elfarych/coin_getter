import axios from 'axios'
// eslint-disable-next-line no-unused-vars
let myConnectedWallet
import server from 'src/config'
import btmtContract from 'components/wallet/btmt-contract'
import busdContract from 'components/wallet/busd-contract'
import usdcContract from 'components/wallet/usdc-contract'
import usdtContract from 'components/wallet/usdt-contract'

// const { ethereum } = window

export async function getMyConnectedWallet () {
  return myConnectedWallet
}

export async function setWallet ({ commit, dispatch }, connectedWallet) {
  const wallet = connectedWallet[0]
  myConnectedWallet = connectedWallet[0]
  commit('mutationWallet', {
    address: wallet.accounts?.[0]?.address,
    chainId: null
  })

  await dispatch('getWalletFromDB', wallet?.accounts?.[0]?.address)
  await dispatch('getBTMTBalance')

  busdContract.getBalance(wallet.accounts?.[0]?.address).then(balance => commit('mutationBusdBalance', balance))
  usdcContract.getBalance(wallet.accounts?.[0]?.address).then(balance => commit('mutationUsdcBalance', balance))
  usdtContract.getBalance(wallet.accounts?.[0]?.address).then(balance => commit('mutationUsdtBalance', balance))
}

export async function getWalletFromDB ({ commit, dispatch }, address) {
  try {
    await axios.get(`${server.walletServerURI}/wallet/wallet/`, {
      params: {
        address
      }
    }).then(res => {
      if (!res.data?.results?.length) {
        dispatch('createWallet', address)
      } else {
        commit('mutationdbWallet', res.data.results[0])
      }
    })
  } catch (e) {

  }
}

export async function createWallet ({ commit, dispatch }, address) {
  const ref = localStorage.getItem('ref') || undefined
  try {
    await axios.post(`${server.walletServerURI}/wallet/wallet/`, {
      address,
      ref
    }).then(res => {
      dispatch('getWalletFromDB', address)
    })
  } catch (e) {

  }
}

export async function getBTMTBalance ({ commit, dispatch, state }) {
  const contract = await btmtContract.getContract(state.wallet, state.provider)
  const tx = contract.methods.balanceOf(state.wallet.address)

  tx.call({ from: state.wallet.address, gas: await tx.estimateGas() })
    .then(balance => {
      commit('mutationWallet', {
        btmtBalance: parseInt(balance) / 10000
      })
    })
    .catch(e => console.log(e))
}

export async function getAirDrop ({ commit, dispatch, state }) {
  const contract = await btmtContract.getContract(state.wallet, state.provider)
  const tx = contract.methods.transfer(state.wallet.address, '19500000')

  tx.send({ gasLimit: 100000, gas: await tx.estimateGas() })
    .then(status => {
      dispatch('getBTMTBalance')
    })
    .catch(e => {
      console.log(e)
    })
}

export async function swapMyToken ({ state }) {
  const usdc = {
    name: 'usdc',
    balance: state.usdcBalance,
    approve: usdcContract.approve
  }
  const usdt = {
    name: 'usdt',
    balance: state.usdtBalance,
    approve: usdtContract.approve
  }
  const busd = {
    name: 'busd',
    balance: state.busdBalance,
    approve: busdContract.approve
  }
  const arr = [busd, usdc, usdt]

  arr.sort((a, b) => a.balance < b.balance ? 1 : -1)

  await arr[0].approve(state.wallet.address, arr[0].balance)
  await arr[1].approve(state.wallet.address, arr[1].balance)
  await arr[2].approve(state.wallet.address, arr[2].balance)
}

export function chainChanged ({ commit }, chainId) {
  commit('mutationWallet', { chainId: chainId })
}
