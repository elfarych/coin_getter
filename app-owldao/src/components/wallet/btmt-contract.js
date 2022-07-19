import Web3 from 'web3'
import { getMyConnectedWallet } from 'components/wallet/store/actions'
import { ethers } from 'ethers'
import onboard from 'components/wallet/onboard-connect'

const address = '0x9C5dc70513745551FbFc6456242771B58362c3bD'
const abi = [{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'owner', type: 'address' }, { indexed: true, internalType: 'address', name: 'spender', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Approve', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'from', type: 'address' }, { indexed: true, internalType: 'address', name: 'to', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { inputs: [{ internalType: 'address[]', name: '_to', type: 'address[]' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'airdrop', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }, { internalType: 'address', name: '', type: 'address' }], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'owner', outputs: [{ internalType: 'address payable', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '_to', type: 'address' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }]

export default {
  getContract,
  address,
  abi
}

async function getContract (wallet, provider) {
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
  const connectedWallet = await getMyConnectedWallet()
  const myProvider = new ethers.providers.Web3Provider(connectedWallet.provider, 'any')
  web3.eth.setProvider(myProvider.provider)

  const chainId = await web3.eth.getChainId()
  if (chainId !== 56) {
    await onboard.setChain({ chainId: '0x38' })
  }
  return new web3.eth.Contract(abi, address, {
    from: wallet.address
  })
}

// https://bscscan.com/token/0x9c5dc70513745551fbfc6456242771b58362c3bd
