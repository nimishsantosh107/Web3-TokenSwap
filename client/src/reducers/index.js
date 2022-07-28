import { combineReducers } from "redux";

const web3Reducer = (web3 = {}, action) => {
    switch (action.type) {
        case "CONNECT_WALLET":
            return action.payload.web3;
        default:
            return web3;
    }
};

const accountReducer = (account = "0x0", action) => {
    switch (action.type) {
        case "CONNECT_WALLET":
            return action.payload.account;
        case "CHANGE_ACCOUNT":
            return action.payload.account;
        case "CHANGE_CHAIN":
            return action.payload.account;
        default:
            return account;
    }
};

const balanceReducer = (balance = 0, action) => {
    switch (action.type) {
        case "CONNECT_WALLET":
            return action.payload.balance;
        case "CHANGE_ACCOUNT":
            return action.payload.balance;
        case "CHANGE_CHAIN":
            return action.payload.balance;
        default:
            return balance;
    }
};

const networkReducer = (network = "...", action) => {
    switch (action.type) {
        case "CONNECT_WALLET":
            return action.payload.network;
        case "CHANGE_CHAIN":
            return action.payload.network;
        default:
            return network;
    }
};

const dropdownToken1Reducer = (token = "", action) => {
    switch (action.type) {
        case "SELECTED_TOKEN_1":
            return action.payload.token;
        default:
            return token;
    }
};

const dropdownToken2Reducer = (token = "", action) => {
    switch (action.type) {
        case "SELECTED_TOKEN_2":
            return action.payload.token;
        default:
            return token;
    }
};

export default combineReducers({
    web3: web3Reducer,
    account: accountReducer,
    balance: balanceReducer,
    network: networkReducer,
    token1: dropdownToken1Reducer,
    token2: dropdownToken2Reducer,
});
