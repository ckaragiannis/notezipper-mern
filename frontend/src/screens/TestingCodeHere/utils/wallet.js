const ethers = require("ethers");

const mnemonic =
	"artist intact federal palm balance wall afraid motor apple there subway park";

// const mnemonic =
// 	"twist stamp monitor tired glad stumble crawl cluster slush spin owner price";
const wallet = ethers.Wallet.fromMnemonic(mnemonic);

console.log(`Mnemonic: ${wallet.mnemonic.phrase}`);
console.log(`Address: ${wallet.address}`);

module.exports = wallet;
