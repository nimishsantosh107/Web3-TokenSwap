import "./App.css";
import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import web3Helper from "./web3/web3";
import Header from "./components/Header/Header";
import Page1 from "./containers/Page1";
import Page2 from "./containers/Page2";

class App extends React.Component {
    state = {
        networkId: "...",
        accountAddress: "0x0",
        balance: 0,
    };

    handleConnectWallet = async () => {
        await web3Helper.connectWallet();

        await web3Helper.refresh();

        this.setState({
            networkId: web3Helper.network,
            accountAddress: web3Helper.accounts[0],
            balance: web3Helper.balance,
        });
    };

    handleAccountChange = async (accounts) => {
        await web3Helper.refresh();

        this.setState({
            accountAddress: web3Helper.accounts[0],
            balance: web3Helper.balance,
        });
    };

    handleChainChange = async (chainId) => {
        await web3Helper.refresh();

        this.setState({
            networkId: web3Helper.network,
            accountAddress: web3Helper.accounts[0],
            balance: web3Helper.balance,
        });
    };

    componentDidMount = async () => {
        // // initialize metamask values
        // let network = await web3.eth.net.getNetworkType();
        // let accounts = await web3.eth.getAccounts();
        // let balance = await web3.eth.getBalance(accounts[0]);
        // // initialize tokens and contracts
        // let contracts = await initializeContracts();
        // this.setState({
        //     networkId: network,
        //     accountAddress: accounts[0],
        //     balance: web3.utils.fromWei(balance, "ether"),
        //     contracts,
        // });
        // // set listeners
        window.ethereum.on("accountsChanged", this.handleAccountChange);
        window.ethereum.on("chainChanged", this.handleChainChange);
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header
                        networkId={this.state.networkId}
                        accountAddress={this.state.accountAddress}
                        handleConnectWallet={this.handleConnectWallet}
                    />
                    <div className="content">
                        <Switch>
                            <Route path="/" component={Page1} exact />
                            <Route path="/page2" component={Page2} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
