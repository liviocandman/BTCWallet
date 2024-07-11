const bip39 = require('bip39');
const ethwallet = require('ethereumjs-wallet');

// Create a mnemonic - Criar um mnemonic 
const mnemonic = bip39.generateMnemonic();

// Create the seed from mnemonic - Criar a seed a partir do mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Create HD wallet from seed - Criar a carteira HD a partir da seed
const hdwallet = ethwallet.hdkey.fromMasterSeed(seed);

// Derives the first account (index 0) from the HD wallet - Deriva a primeira conta (indice 0) a partir da carteira HD
const wallet_hdpath = "m/44'/60'/0'/0/";
const wallet = hdwallet.derivePath(wallet_hdpath + '0').getWallet();
const address = '0x' + wallet.getAddress().toString('hex');
const privateKey = wallet.getPrivateKey().toString('hex');

//
console.log('Mnemonic:', mnemonic);
console.log('Address:', address);
console.log('Private Key:', privateKey);
