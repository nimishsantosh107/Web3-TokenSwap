import NERC223 from "../contracts/NERC223.json";
import NERC223Swap from "../contracts/NERC223Swap.json";
import NERC223Helper from "../contracts/NERC223Helper.json";
import NERC223Factory from "../contracts/NERC223Factory.json";

export const initializeTokensAndContracts = async (web3) => {
    const NETWORK_ID = 4; // rinkeby

    let contracts = {};
    let tokens = {};

    const swapContract = new web3.eth.Contract(
        NERC223Swap.abi,
        NERC223Swap.networks[NETWORK_ID].address
    );
    contracts = { ...contracts, swapContract };

    const helperContract = new web3.eth.Contract(
        NERC223Helper.abi,
        NERC223Helper.networks[NETWORK_ID].address
    );
    contracts = { ...contracts, helperContract };

    const factoryContract = new web3.eth.Contract(
        NERC223Factory.abi,
        NERC223Factory.networks[NETWORK_ID].address
    );
    contracts = { ...contracts, factoryContract };

    const tokenAddresses = await factoryContract.methods.getTokens().call();
    for (const address of tokenAddresses) {
        const symbol = await factoryContract.methods.getSymbol(address).call();
        const tokenContract = new web3.eth.Contract(NERC223.abi, address);
        tokens[symbol] = tokenContract;
    }
    return {
        contracts,
        tokens,
    };
};
