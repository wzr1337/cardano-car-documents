const Cardano = require('cardanocli-js')

const options = {}
options.network = 'testnet-magic 1'
options.shelleyGenesisPath = './config/shelley-genesis.json'
options.socketPath = '/ipc/node.socket'

const cardano = new Cardano(options)

module.exports = cardano
