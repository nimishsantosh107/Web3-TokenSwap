import NERC233 from "../contracts/NERC233.json";
import NERC233Swap from "../contracts/NERC233Swap.json";
import NERC233Helper from "../contracts/NERC233Helper.json";
import NERC233Factory from "../contracts/NERC233Factory.json";

export const initializeTokensAndContracts = async (web3) => {
    const NETWORK_ID = 5777; // private

    let contracts = {};
    let tokens = {};

    const swapContract = new web3.eth.Contract(
        NERC233Swap.abi,
        NERC233Swap.networks[NETWORK_ID].address
    );
    contracts = { ...contracts, swapContract };

    const helperContract = new web3.eth.Contract(
        NERC233Helper.abi,
        NERC233Helper.networks[NETWORK_ID].address
    );
    contracts = { ...contracts, helperContract };

    const factoryContract = new web3.eth.Contract(
        NERC233Factory.abi,
        NERC233Factory.networks[NETWORK_ID].address
    );
    contracts = { ...contracts, factoryContract };

    const tokenAddresses = await factoryContract.methods.getTokens().call();
    for (const address of tokenAddresses) {
        const symbol = await factoryContract.methods.getSymbol(address).call();
        const tokenContract = new web3.eth.Contract(NERC233.abi, address);
        tokens[symbol] = tokenContract;
    }
    return {
        contracts,
        tokens,
    };
};
