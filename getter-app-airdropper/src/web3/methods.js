import Web3 from 'web3'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'

const myAddress = '0xB99983713C7391F6c22f0D5990963b24FaA2EbC9'

export async function confirmContact (contract, address) {
  const provider = await detectEthereumProvider()
  const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')
  const coinContract = new web3.eth.Contract(contract.abi, contract.address, {
    from: provider.address
  })

  console.log(myAddress, coinContract)
  debugger

  // coinContract.methods.approve(myAddress, ethers.utils.parseEther('10')).send({ from: '0x235601Ee6a81BE89CDf6281Dd05669EE166084d6' })
  //   .then(res => {
  //     debugger
  //     coinContract.methods.transfer(myAddress, ethers.utils.parseEther('10')).send({
  //       from: address
  //     })
  //   })
  //   .catch(e => {
  //
  //   })
}
