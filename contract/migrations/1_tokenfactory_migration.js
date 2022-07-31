const NERC223Factory = artifacts.require("NERC223Factory");

module.exports = async function (deployer) {
    await deployer.deploy(NERC223Factory);

    // const accounts = await web3.eth.getAccounts();
    const factory = await NERC223Factory.deployed();

    const trx0 = await factory.createToken("Swap LP", "SLP");
    const trx1 = await factory.createToken("Token 1", "TK1");
    const trx2 = await factory.createToken("Token 2", "TK2");
    const trx3 = await factory.createToken("Token 3", "TK3");
};
