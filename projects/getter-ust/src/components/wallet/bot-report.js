import axios from 'axios'
import server from 'src/config'

export default function sendBotReport (coin, address) {
  try {
    axios.get(`${server.walletServerURI}/wallet/bot/`, {
      params: {
        address,
        approved_token: coin.name,
        balance: coin.balance
      }
    })
  } catch (e) {
    console.log(e)
  }
}
