const NERC233Helper = artifacts.require("NERC233Helper");
const NERC233Factory = artifacts.require("NERC233Factory");

module.exports = async function (deployer) {
    await deployer.deploy(NERC233Helper);

    const accounts = await web3.eth.getAccounts();
    const factory = await NERC233Factory.deployed();
    const helper = await NERC233Helper.deployed();

    const tokenAddresses = await factory.getTokens();

    for (const address of tokenAddresses) {
        const symbol = await factory.getSymbol(address);
        const trx = await helper.setTokenAddress(symbol, address);
    }
};
