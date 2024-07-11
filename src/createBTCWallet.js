const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//Set the network
//bitcoin -> main network / testnet -> test network
const network = bitcoin.networks.testnet

//Create a seed from mnemonic
const mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Create the Root of the HD wallet
const root = bip32.fromSeed(seed, network)

//Create an account - pvt-pub keys
const path = `m/49'/1'/0'/0`
const account = root.derivePath(path)
const node = account.derive(0).derive(0)

const btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

//
console.log("Generated wallet:")
console.log("Address: ", btcAdress)
console.log("Private Key:", node.toWIF())
console.log("Seed", mnemonic)
