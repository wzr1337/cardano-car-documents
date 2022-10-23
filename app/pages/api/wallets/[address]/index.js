import nextConnect from 'next-connect'
import auth from '../../../../middleware/auth'
import {
  getWalletByAddress,
  getWalletById,
} from '../../../../src/models/wallets'

const handler = nextConnect()

handler
.use(auth) // use auth middleware
.get(async (req, res) => { // register GET
  const { address } = req.query

  const wallet = address.startsWith('addr_')
    ? await getWalletByAddress(address)
    : await getWalletById(address)

  res.json(wallet)
})

export default handler
