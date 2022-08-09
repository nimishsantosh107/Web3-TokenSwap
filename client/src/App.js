import React from "react";

import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import BGbubbles from "./components/BGBubbles/BGBubbles";
import Header from "./components/Header/Header";
import PreConnect from "./components/PreConnect/PreConnect";

import Swap from "./containers/Swap/Swap";
import Liquidity from "./containers/Liquidity/Liquidity";
import Faucet from "./containers/Faucet/Faucet";

import { initTokensAndContracts, handleAccountChange, handleChainChange } from "./actions";
import "./App.css";

class App extends React.Component {
    componentDidMount = () => {
        try {
            if (!window.ethereum) return alert("Install Metamask");

            window.ethereum.on("accountsChanged", this.props.handleAccountChange);
            window.ethereum.on("chainChanged", this.props.handleChainChange);
        } catch (e) {
            console.error(e);
            throw new Error("[ERR] No window.ethereum object");
        }
    };

    componentDidUpdate = () => {
        if (this.props.web3.eth) {
            this.props.initTokensAndContracts();
        }
    };

    getPageContent = () => {
        if (this.props.web3.eth) {
            return (
                <>
                    <Switch>
                        <Route path="/" component={Swap} exact />
                        <Route path="/liquidity" component={Liquidity} />
                        <Route path="/faucet" component={Faucet} />
                    </Switch>
                </>
            );
        } else {
            return <PreConnect />;
        }
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <BGbubbles />
                    <Header />
                    <div className="content">{this.getPageContent()}</div>
                </div>
            </BrowserRouter>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    web3: state.web3,
});
export default connect(mapStateToProps, {
    initTokensAndContracts,
    handleAccountChange,
    handleChainChange,
})(App);

/*
NOTES
https://17.reactjs.org/docs/concurrent-mode-suspense.html
react-portal
*/
