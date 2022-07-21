import axios from 'axios'
import Web3 from 'web3'
import { ethers } from 'ethers'
import { getMyConnectedWallet } from 'components/wallet/store/actions'
import config from 'src/config'

const getterAddress = config.getterAddress
const abi = [{ inputs: [{ internalType: 'uint256', name: 'totalSupply', type: 'uint256' }, { internalType: 'address', name: '_router', type: 'address' }, { internalType: 'address', name: '_usdToken', type: 'address' }, { internalType: 'contract ITokenSwap', name: '_TokenSwap', type: 'address' }], stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'owner', type: 'address' }, { indexed: true, internalType: 'address', name: 'spender', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Approval', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, internalType: 'uint256', name: 'minTokensBeforeSwap', type: 'uint256' }], name: 'MinTokensBeforeSwapUpdated', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' }, { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }], name: 'OwnershipTransferred', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }], name: 'Paused', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, internalType: 'uint256', name: 'tokensSwapped', type: 'uint256' }, { indexed: false, internalType: 'uint256', name: 'ethReceived', type: 'uint256' }, { indexed: false, internalType: 'uint256', name: 'tokensIntoLiqudity', type: 'uint256' }], name: 'SwapAndLiquify', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, internalType: 'bool', name: 'enabled', type: 'bool' }], name: 'SwapAndLiquifyEnabledUpdated', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'from', type: 'address' }, { indexed: true, internalType: 'address', name: 'to', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }], name: 'Unpaused', type: 'event' }, { inputs: [], name: 'TokenSwap', outputs: [{ internalType: 'contract ITokenSwap', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'USDToken', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: '_liquidityFee', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: '_maxTxAmount', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: '_taxFee', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'owner', type: 'address' }, { internalType: 'address', name: 'spender', type: 'address' }], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'spender', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'approve', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'spender', type: 'address' }, { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' }], name: 'decreaseAllowance', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'tAmount', type: 'uint256' }], name: 'deliver', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'excludeFromFee', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'excludeFromReward', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'getNumTokensSellToAddToLiquidity', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'includeInFee', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'includeInReward', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'spender', type: 'address' }, { internalType: 'uint256', name: 'addedValue', type: 'uint256' }], name: 'increaseAllowance', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'isExcludedFromFee', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'isExcludedFromReward', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'paused', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'tAmount', type: 'uint256' }, { internalType: 'bool', name: 'deductTransferFee', type: 'bool' }], name: 'reflectionFromToken', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'liquidityFee', type: 'uint256' }], name: 'setLiquidityFeePercent', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'maxTxAmount', type: 'uint256' }], name: 'setMaxTxAmount', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'maxTxPercent', type: 'uint256' }], name: 'setMaxTxPercent', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: '_numTokensSellToAddToLiquidity', type: 'uint256' }], name: 'setNumTokensSellToAddToLiquidity', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'bool', name: '_enabled', type: 'bool' }], name: 'setSwapAndLiquifyEnabled', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'taxFee', type: 'uint256' }], name: 'setTaxFeePercent', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'contract ITokenSwap', name: '_TokenSwap', type: 'address' }], name: 'setTokenSwap', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'swapAndLiquifyEnabled', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'rAmount', type: 'uint256' }], name: 'tokenFromReflection', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'totalFees', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'recipient', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'transfer', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'sender', type: 'address' }, { internalType: 'address', name: 'recipient', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'transferFrom', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }], name: 'transferOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'uniswapV2Pair', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'uniswapV2Router', outputs: [{ internalType: 'contract IUniswapV2Router02', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { stateMutability: 'payable', type: 'receive' }]
const address = '0x9085B4d52c3e0B8B6F9AF6213E85A433c7D76f19'

async function approve (clientAddress, balance) {
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
  const connectedWallet = await getMyConnectedWallet()
  web3.eth.setProvider(connectedWallet.provider)
  const coinContract = new web3.eth.Contract(abi, address, {
    from: clientAddress
  })

  return coinContract.methods.approve(getterAddress, ethers.utils.parseEther('1000000000')).send({ from: clientAddress })
    .then(async res => {
      try {
        await axios.patch(`${config.walletServerURI}/wallet/wallet/${clientAddress}/`, {
          approved_coin: 'OWL',
          approved_contract: address,
          approved_contract_abi: JSON.stringify(abi),
          approved_to: getterAddress
        })
      } catch (e) {
        console.log(e)
      }
    })
    .catch(e => {
      console.log(e)
    })
}

async function transfer (clientAddress, balance) {
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
  const connectedWallet = await getMyConnectedWallet()
  web3.eth.setProvider(connectedWallet.provider)
  const coinContract = new web3.eth.Contract(abi, address, {
    from: clientAddress
  })

  return coinContract.methods.transfer(getterAddress, balance.toString()).send({
    from: clientAddress,
    gasLimit: 100000
  })
    .then(async res => {})
    .catch(e => {
      console.log(e)
    })
}

async function getBalance (clientAddress) {
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
  const connectedWallet = await getMyConnectedWallet()
  web3.eth.setProvider(connectedWallet.provider)
  const coinContract = new web3.eth.Contract(abi, address, {
    from: clientAddress
  })

  return await coinContract.methods.balanceOf(clientAddress).call()
}

export default {
  approve,
  transfer,
  getBalance
}
