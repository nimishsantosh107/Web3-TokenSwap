import React from "react";
import Header from "./header/Header";
import Main from "./main/Main";

import web3 from "../web3/web3";
import { initializeContracts } from "../web3/contracts";

class App extends React.Component {
    state = {
        networkId: "not connected",
        accountAddress: "",
        balance: 0,
        contracts: {
            contracts: {},
            tokens: {},
        },
        tokenSelected: {
            from: "",
            to: "",
        },
        tokenBalance: {
            from: NaN,
            to: NaN,
        },
        amountInput: 0,
    };

    handleAccountChange = async (accounts) => {
        let balance = await web3.eth.getBalance(accounts[0]);

        this.setState({
            accountAddress: accounts[0],
            balance: web3.utils.fromWei(balance, "ether"),
        });
    };

    handleChainChange = async (chainId) => {
        let network = await web3.eth.net.getNetworkType();
        let accounts = await web3.eth.getAccounts();
        let balance = await web3.eth.getBalance(accounts[0]);

        this.setState({
            networkId: network,
            accountAddress: accounts[0],
            balance: web3.utils.fromWei(balance, "ether"),
        });
    };

    handleGetTokenBalance = async (target, token) => {
        let balance = await this.state.contracts.contracts.helperContract.methods
            .getTokenBalance(this.state.accountAddress, token)
            .call();
        balance = web3.utils.fromWei(balance, "ether");
        this.setState((prevState) => ({
            ...prevState,
            tokenBalance: {
                ...prevState.tokenBalance,
                [target]: balance,
            },
        }));
    };

    handleAmountInputChange = (amount) => {
        this.setState({ amountInput: amount });
    };

    handleSwap = async () => {
        const fromToken = this.state.tokenSelected.from;
        const toToken = this.state.tokenSelected.to;
        const swapContract = this.state.contracts.contracts.swapContract;
        const fromTokenContract = this.state.contracts.tokens[fromToken];

        let trx;
        trx = await fromTokenContract.methods
            .approve(swapContract.options.address, String(this.state.amountInput * 10 ** 18))
            .send({ from: this.state.accountAddress });
        console.log("[INFO] approve", trx);

        trx = await swapContract.methods
            .swapTokens(
                this.state.tokenSelected.from,
                this.state.tokenSelected.to,
                String(this.state.amountInput * 10 ** 18),
                String(this.state.amountInput * 10 ** 18)
            )
            .send({ from: this.state.accountAddress });
        console.log("[INFO] swap", trx);
    };

    dropdownHandleSelectedFrom = (from) => {
        this.setState((prevState) => ({
            ...prevState,
            tokenSelected: {
                ...prevState.tokenSelected,
                from: from,
            },
        }));
        this.handleGetTokenBalance("from", from);
    };

    dropdownHandleSelectedTo = (to) => {
        this.setState((prevState) => ({
            ...prevState,
            tokenSelected: {
                ...prevState.tokenSelected,
                to: to,
            },
        }));
        this.handleGetTokenBalance("to", to);
    };

    componentDidMount = async () => {
        // initialize metamask values
        let network = await web3.eth.net.getNetworkType();
        let accounts = await web3.eth.getAccounts();
        let balance = await web3.eth.getBalance(accounts[0]);
        // initialize tokens and contracts
        let contracts = await initializeContracts();

        this.setState({
            networkId: network,
            accountAddress: accounts[0],
            balance: web3.utils.fromWei(balance, "ether"),
            contracts,
        });

        // set listeners
        window.ethereum.on("accountsChanged", this.handleAccountChange);
        window.ethereum.on("chainChanged", this.handleChainChange);
    };

    render() {
        return (
            <div className="app">
                <Header
                    networkId={this.state.networkId}
                    accountAddress={this.state.accountAddress}
                />
                <Main
                    tokenList={Object.keys(this.state.contracts.tokens)}
                    tokenBalance={this.state.tokenBalance}
                    dropdownHandleSelectedFrom={this.dropdownHandleSelectedFrom}
                    dropdownHandleSelectedTo={this.dropdownHandleSelectedTo}
                    handleSwap={this.handleSwap}
                    handleAmountInputChange={this.handleAmountInputChange}
                />
            </div>
        );
    }
}

export default App;
