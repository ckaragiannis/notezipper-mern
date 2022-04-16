const ethers = require("ethers");

const wallet = ethers.Wallet.createRandom(); // create private key and associated address

console.log(`Mnemonic: ${wallet.mnemonic.phrase}`);
console.log("wallet Addresss is: ", wallet.address);
