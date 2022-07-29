import web3Helper from "../web3/helper";
import { constants } from "./constants";
import { initializeTokensAndContracts } from "../web3/contracts";

export const connectWallet = () => {
    return async (dispatch, getState) => {
        const web3 = await web3Helper.connectWallet();
        const network = await web3Helper.getNetwork(web3);
        const account = await web3Helper.getAccount(web3);
        const balance = await web3Helper.getBalance(web3, account);

        dispatch({
            type: constants.CONNECT_WALLET,
            payload: {
                web3,
                network,
                account,
                balance,
            },
        });
    };
};

export const handleAccountChange = (accounts) => {
    return async (dispatch, getState) => {
        const web3 = getState().web3;
        const account = await web3Helper.getAccount(web3);
        const balance = await web3Helper.getBalance(web3, account);

        dispatch({
            type: constants.CHANGE_ACCOUNT,
            payload: {
                account,
                balance,
            },
        });
    };
};

export const handleChainChange = (chainID) => {
    return async (dispatch, getState) => {
        const web3 = getState().web3;
        const network = await web3Helper.getNetwork(web3);
        const account = await web3Helper.getAccount(web3);
        const balance = await web3Helper.getBalance(web3, account);

        dispatch({
            type: constants.CHANGE_CHAIN,
            payload: {
                network,
                account,
                balance,
            },
        });
    };
};

export const initTokensAndContracts = () => {
    return async (dispatch, getState) => {
        const web3 = getState().web3;
        const data = await initializeTokensAndContracts(web3);

        dispatch({
            type: constants.INIT_TOKENS_CONTRACTS,
            payload: {
                tokens: data.tokens,
                contracts: data.contracts,
            },
        });
    };
};

export const getLiquidityInformation = () => {
    return async (dispatch, getState) => {
        const { tokens, contracts } = getState();

        let liquidityInfo = {};

        for (let tokenSymbol of Object.keys(tokens)) {
            let balance = await contracts.helperContract.methods
                .getTokenBalance(contracts.swapContract._address, tokenSymbol)
                .call();
            liquidityInfo[tokenSymbol] = balance;
        }

        dispatch({
            type: constants.UPDATE_LIQUIDITY_INFO,
            payload: {
                liquidity: liquidityInfo,
            },
        });
    };
};

export const handleToken1Selected = (selectedToken) => {
    return {
        type: constants.SELECTED_TOKEN_1,
        payload: {
            token: selectedToken,
        },
    };
};

export const handleToken2Selected = (selectedToken) => {
    return {
        type: constants.SELECTED_TOKEN_2,
        payload: {
            token: selectedToken,
        },
    };
};

export const updateSwapCounter = () => {
    return { type: constants.SWAP_PERFORMED };
};
