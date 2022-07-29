import "./App.css";
import React from "react";

import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import LiquidityView from "./components/LiquidityView/LiquidityView";

import Liquidity from "./containers/Liquidity/Liquidity";
import Swap from "./containers/Swap/Swap";

import { initTokensAndContracts } from "./actions";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate = () => {
        if (this.props.web3.eth) {
            this.props.initTokensAndContracts();
        }
    };

    getPageContent = () => {
        if (this.props.web3.eth) {
            return (
                <div className="content">
                    <Switch>
                        <Route path="/" component={Swap} exact />
                        <Route path="/liquidity" component={Liquidity} />
                    </Switch>
                    <LiquidityView />
                </div>
            );
        } else {
            return null;
        }
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    {this.getPageContent()}
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
})(App);
