const NERC233Factory = artifacts.require("NERC233Factory");

module.exports = async function (deployer) {
    await deployer.deploy(NERC233Factory);

    const accounts = await web3.eth.getAccounts();
    const factory = await NERC233Factory.deployed();

    const trx1 = await factory.createToken("Thala Coin", "AAMAI");
    const trx2 = await factory.createToken("Thalapthy Coin", "ANIL");
    const trx3 = await factory.createToken("Sura Token", "SURA");
};
