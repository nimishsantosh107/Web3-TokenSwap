const NERC223Helper = artifacts.require("NERC223Helper");
const NERC223Factory = artifacts.require("NERC223Factory");

module.exports = async function (deployer) {
    await deployer.deploy(NERC223Helper);

    const factory = await NERC223Factory.deployed();
    const helper = await NERC223Helper.deployed();

    const tokenAddresses = await factory.getTokens();

    for (const address of tokenAddresses) {
        const symbol = await factory.getSymbol(address);
        const trx = await helper.setTokenAddress(symbol, address);
    }
};
