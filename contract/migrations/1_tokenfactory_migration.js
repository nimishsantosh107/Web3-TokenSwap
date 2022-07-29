const NERC233Factory = artifacts.require("NERC233Factory");

module.exports = async function (deployer) {
    await deployer.deploy(NERC233Factory);

    // const accounts = await web3.eth.getAccounts();
    const factory = await NERC233Factory.deployed();

    const trx0 = await factory.createToken("Swap LP", "SLP");
    const trx1 = await factory.createToken("Token 1", "TK1");
    const trx2 = await factory.createToken("Token 2", "TK2");
    const trx3 = await factory.createToken("Token 3", "TK2");
};
