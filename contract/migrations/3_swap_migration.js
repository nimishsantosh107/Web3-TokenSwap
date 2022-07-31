const NERC223Helper = artifacts.require("NERC223Helper");
const NERC223Factory = artifacts.require("NERC223Factory");
const NERC223Swap = artifacts.require("NERC223Swap");

module.exports = async function (deployer) {
    const helper = await NERC223Helper.deployed();
    const factory = await NERC223Factory.deployed();

    const tokenAddresses = await factory.getTokens();
    const tokenSymbolLP = await factory.getSymbol(tokenAddresses[0]);

    await deployer.deploy(NERC223Swap, "Soap Swap", helper.address, tokenSymbolLP);
};
