import { combineReducers } from "redux";
import { actionConstants } from "../actions/constants";

const web3Reducer = (web3 = {}, action) => {
    switch (action.type) {
        case actionConstants.CONNECT_WALLET:
            return action.payload.web3;
        default:
            return web3;
    }
};

const accountReducer = (account = "0x0", action) => {
    switch (action.type) {
        case actionConstants.CONNECT_WALLET:
            return action.payload.account;
        case actionConstants.CHANGE_ACCOUNT:
            return action.payload.account;
        case actionConstants.CHANGE_CHAIN:
            return action.payload.account;
        default:
            return account;
    }
};

const balanceReducer = (balance = 0, action) => {
    switch (action.type) {
        case actionConstants.CONNECT_WALLET:
            return action.payload.balance;
        case actionConstants.CHANGE_ACCOUNT:
            return action.payload.balance;
        case actionConstants.CHANGE_CHAIN:
            return action.payload.balance;
        default:
            return balance;
    }
};

const networkReducer = (network = "...", action) => {
    switch (action.type) {
        case actionConstants.CONNECT_WALLET:
            return action.payload.network;
        case actionConstants.CHANGE_CHAIN:
            return action.payload.network;
        default:
            return network;
    }
};

const tokensReducer = (tokens = {}, action) => {
    switch (action.type) {
        case actionConstants.INIT_TOKENS_CONTRACTS:
            return action.payload.tokens;
        default:
            return tokens;
    }
};

const contractsReducer = (contracts = {}, action) => {
    switch (action.type) {
        case actionConstants.INIT_TOKENS_CONTRACTS:
            return action.payload.contracts;
        default:
            return contracts;
    }
};

const liquidityInformationReducer = (liquidity = {}, action) => {
    switch (action.type) {
        case actionConstants.UPDATE_LIQUIDITY_INFO:
            return action.payload.liquidity;
        default:
            return liquidity;
    }
};

const tokenBalanceReducer = (balance = 0, action) => {
    switch (action.type) {
        case actionConstants.UPDATE_TOKEN_BALANCE:
            return action.payload.balance;
        default:
            return balance;
    }
};

const tokenPriceInformationReducer = (price = {}, action) => {
    return {
        SLP2TK1: 1,
        SLP2TK2: 1,
        SLP2TK3: 1,
        TK12TK2: 1,
        TK12TK3: 1,
        TK22TK3: 1,
    };
};

const liquidityUpdatesCounterReducer = (updatesCounter = "", action) => {
    switch (action.type) {
        case actionConstants.LIQUIDITY_UPDATE_PERFORMED:
            return updatesCounter + 1;
        default:
            return updatesCounter;
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
    tokenBalance: tokenBalanceReducer,
    price: tokenPriceInformationReducer,
    updatesCounter: liquidityUpdatesCounterReducer,
});
