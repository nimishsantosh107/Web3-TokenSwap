import web3Helper from "../web3/helper";

export const connectWallet = () => {
    return async (dispatch, getState) => {
        const web3 = await web3Helper.connectWallet();
        const network = await web3Helper.getNetwork(web3);
        const account = await web3Helper.getAccount(web3);
        const balance = await web3Helper.getBalance(web3, account);

        dispatch({
            type: "CONNECT_WALLET",
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
            type: "CHANGE_ACCOUNT",
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
            type: "CHANGE_CHAIN",
            payload: {
                network,
                account,
                balance,
            },
        });
    };
};

export const handleToken1Selected = (selectedToken) => {
    return {
        type: "SELECTED_TOKEN_1",
        payload: {
            token: selectedToken,
        },
    };
};

export const handleToken2Selected = (selectedToken) => {
    return {
        type: "SELECTED_TOKEN_2",
        payload: {
            token: selectedToken,
        },
    };
};
