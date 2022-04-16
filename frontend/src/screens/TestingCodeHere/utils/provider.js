const ethers = require("ethers");

const provider = new ethers.getDefaultProvider("ropsten", {
	infura: "https://ropsten.infura.io/v3/76e6f974387b4c87a33e8596223dd35c",
});

module.exports = provider;
