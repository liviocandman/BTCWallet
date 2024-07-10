const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//set the network
//bitcoin - main network
//testnet - test network
const network = bitcoin.networks.testnet

//derivation of HD wallets
const path = `m/49'/1'/0'/0`

//creating mnemonic for the seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//creating the Root of the HD wallet
let root = bip32.fromSeed(seed, network)

//creating an account - pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAdress)
console.log("Chave privada:", node.toWIF())
console.log("Seed", mnemonic)
