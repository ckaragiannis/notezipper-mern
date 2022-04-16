const ethers = require("ethers");
const wallet = require("./utils/wallet");
const provider = require("./utils/provider");
const { address, abi } = require("./utils/config");

// connect to Ethereum BlockChain and read the balance of a speceific address in smart contract of USDC
// const main = async () => {}
async function main() {
	const account = wallet.connect(provider); // connect to the Ethereum BlockChain
	const usdc = new ethers.Contract(address, abi, account);
	const usdcBalance = await usdc.balanceOf(account.address);
	console.log(usdcBalance.toString());
	console.log(`USDC balance: ${ethers.utils.formatUnits(usdcBalance, 6)}`); // six decimal points for usdc and for most other tokens including ether itll be 18
}

main();
