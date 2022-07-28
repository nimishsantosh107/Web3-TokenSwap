import "./SwapForm.css";
import React from "react";

import { connect } from "react-redux";

import Dropdown from "../../components/Dropdown/Dropdown";
import { handleToken1Selected, handleToken2Selected } from "../../actions";

const SwapForm = (props) => {
    return (
        <div className="swapform">
            <div className="swapform__input-container">
                <input className="swapform__text" type="number" placeholder="0.0" />
                <Dropdown
                    className="swapform__dropdown"
                    defaultTitle="ETH"
                    list={["ETH", "LOL"]}
                    handleSelectedItem={props.handleToken1Selected}
                />
            </div>
            <hr className="swapform__hr" />
            <div className="swapform__input-container">
                <input className="swapform__text" type="number" placeholder="0.0" />
                <Dropdown
                    className="swapform__dropdown"
                    defaultTitle="BNB"
                    list={["BNB", "LOL"]}
                    handleSelectedItem={props.handleToken2Selected}
                />
            </div>
            <div className="swapform__footer">
                <span>Price: </span>
                <span>
                    <b>1 BNB = 1024 LOL</b>
                </span>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({});
export default connect(mapStateToProps, {
    handleToken1Selected,
    handleToken2Selected,
})(SwapForm);
