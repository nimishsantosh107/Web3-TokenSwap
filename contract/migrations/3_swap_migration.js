const NERC233Helper = artifacts.require("NERC233Helper");
const NERC233Swap = artifacts.require("NERC233Swap");

module.exports = async function (deployer) {
    const helper = await NERC233Helper.deployed();

    await deployer.deploy(NERC233Swap, "SuraSwap", helper.address);

    const accounts = await web3.eth.getAccounts();
    const swap = await NERC233Swap.deployed();
};
