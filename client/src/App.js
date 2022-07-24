import "./App.css";
import React from "react";

import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import { handleAccountChange, handleChainChange } from "./actions";

class App extends React.Component {
    componentDidMount = async () => {
        window.ethereum.on("accountsChanged", this.props.handleAccountChange);
        window.ethereum.on("chainChanged", this.props.handleChainChange);
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <div className="content">
                        {/* <Switch>
                            <Route path="/" component={} exact />
                            <Route path="/liquidity" component={} />
                        </Switch> */}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({});
export default connect(mapStateToProps, { handleAccountChange, handleChainChange })(App);
