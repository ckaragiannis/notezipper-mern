const ethers = require("ethers");
const wallet = require("./utils/wallet.js");
const provider = require("./utils/provider.js");
const { address, abi } = require("./utils/config.js");

async function main(args) {
	const account = wallet.connect(provider);

	const usdc = new ethers.Contract(address, abi, account);

	let to, value;
	try {
		to = ethers.utils.getAddress(args[0]);
	} catch (err) {
		console.error(`Invalid recipient of the tokens address: ${args[0]}`);
		process.exit(1); // 0 means normal exit of system, but 1 means error
	}

	try {
		value = ethers.utils.parseUnits(args[1], 6);
		if (value.isNegative()) {
			throw new Error();
		}
	} catch (err) {
		console.error(`Invalid amount: ${args[1]}`);
		process.exit(1); // 0 means normal exit of system, but 1
	}

	const balanceOfTokens = await usdc.balanceOf(account.address);
	if (balanceOfTokens.lt(value)) {
		const valueFormatted = ethers.utils.formatUnits(value, 6);
		const balanceFormatted = ethers.utils.formatUnits(balanceOfTokens, 6);
		console.error(
			`Insufficient balance to send ${valueFormatted}, (you only have ${balanceFormatted})`
		);
		process.exit(1);
	}

	const tx = await usdc.transfer(to, value, { gasPrice: 20e9 });
	console.log(`Transaction Hash: ${tx.hash}`);

	const txReceipt = await tx.wait();
	console.log(
		`Transaction confirmed in Block Number: ${txReceipt.blockNumber}`
	);
}

main(process.argv.slice(2));
