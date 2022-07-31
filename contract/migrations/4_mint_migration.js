const NERC223Helper = artifacts.require("NERC223Helper");
const NERC223Factory = artifacts.require("NERC223Factory");
const NERC223Swap = artifacts.require("NERC223Swap");

module.exports = async function (deployer, network, accounts) {
    const helper = await NERC223Helper.deployed();
    const factory = await NERC223Factory.deployed();

    const tokenAddrs = await factory.getTokens();

    for (var i = 0; i < 3; i++) {
        await helper._mintToken(accounts[i], tokenAddrs[1], "2500" + "0".repeat(18));
        await helper._mintToken(accounts[i], tokenAddrs[2], "500" + "0".repeat(18));
        await helper._mintToken(accounts[i], tokenAddrs[3], "1500" + "0".repeat(18));
    }
};
