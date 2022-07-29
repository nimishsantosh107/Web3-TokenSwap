import { combineReducers } from "redux";
import { constants } from "../actions/constants";

const web3Reducer = (web3 = {}, action) => {
    switch (action.type) {
        case constants.CONNECT_WALLET:
            return action.payload.web3;
        default:
            return web3;
    }
};

const accountReducer = (account = "0x0", action) => {
    switch (action.type) {
        case constants.CONNECT_WALLET:
            return action.payload.account;
        case constants.CHANGE_ACCOUNT:
            return action.payload.account;
        case constants.CHANGE_CHAIN:
            return action.payload.account;
        default:
            return account;
    }
};

const balanceReducer = (balance = 0, action) => {
    switch (action.type) {
        case constants.CONNECT_WALLET:
            return action.payload.balance;
        case constants.CHANGE_ACCOUNT:
            return action.payload.balance;
        case constants.CHANGE_CHAIN:
            return action.payload.balance;
        default:
            return balance;
    }
};

const networkReducer = (network = "...", action) => {
    switch (action.type) {
        case constants.CONNECT_WALLET:
            return action.payload.network;
        case constants.CHANGE_CHAIN:
            return action.payload.network;
        default:
            return network;
    }
};

const tokensReducer = (tokens = {}, action) => {
    switch (action.type) {
        case constants.INIT_TOKENS_CONTRACTS:
            return action.payload.tokens;
        default:
            return tokens;
    }
};

const contractsReducer = (contracts = {}, action) => {
    switch (action.type) {
        case constants.INIT_TOKENS_CONTRACTS:
            return action.payload.contracts;
        default:
            return contracts;
    }
};

const liquidityInformationReducer = (liquidity = {}, action) => {
    switch (action.type) {
        case constants.UPDATE_LIQUIDITY_INFO:
            return action.payload.liquidity;
        default:
            return liquidity;
    }
};

const dropdownToken1Reducer = (token = "", action) => {
    switch (action.type) {
        case constants.SELECTED_TOKEN_1:
            return action.payload.token;
        default:
            return token;
    }
};

const dropdownToken2Reducer = (token = "", action) => {
    switch (action.type) {
        case constants.SELECTED_TOKEN_2:
            return action.payload.token;
        default:
            return token;
    }
};

const swapsCounterReducer = (swapsCounter = "", action) => {
    switch (action.type) {
        case constants.SWAP_PERFORMED:
            return swapsCounter + 1;
        default:
            return swapsCounter;
    }
};

export default combineReducers({
    web3: web3Reducer,
    account: accountReducer,
    balance: balanceReducer,
    network: networkReducer,
    tokens: tokensReducer,
    contracts: contractsReducer,
    liquidity: liquidityInformationReducer,
    token1: dropdownToken1Reducer,
    token2: dropdownToken2Reducer,
    swapsCounter: swapsCounterReducer,
});
