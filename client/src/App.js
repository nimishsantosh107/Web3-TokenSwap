import "./App.css";
import React from "react";

import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Swap from "./containers/Swap/Swap";
import LiquidityView from "./components/LiquidityView/LiquidityView";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <div className="content">
                        <Switch>
                            <Route path="/" component={Swap} exact />
                            {/* <Route path="/liquidity" component={} /> */}
                        </Switch>
                        <LiquidityView list={["a", "b", "c"]} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({});
export default connect(mapStateToProps, {})(App);
