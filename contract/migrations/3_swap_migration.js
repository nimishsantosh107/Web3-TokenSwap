const NERC233Helper = artifacts.require("NERC233Helper");
const NERC233Factory = artifacts.require("NERC233Factory");
const NERC233Swap = artifacts.require("NERC233Swap");

module.exports = async function (deployer) {
    const helper = await NERC233Helper.deployed();
    const factory = await NERC233Factory.deployed();

    const tokenAddresses = await factory.getTokens();
    const tokenSymbolLP = await factory.getSymbol(tokenAddresses[0]);

    await deployer.deploy(NERC233Swap, "Soap Swap", helper.address, tokenSymbolLP);
    // const swap = await NERC233Swap.deployed();
};
