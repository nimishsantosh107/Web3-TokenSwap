import "./FaucetForm.css";
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import Dropdown from "../Dropdown/Dropdown";

const FaucetForm = (props) => {
    const [tokenF, setTokenF] = useState("");
    const [valueF, setValueF] = useState("");

    useEffect(() => {
        setTokenF(Object.keys(props.tokens)[1]);
    }, [props.tokens]);

    const handleMint = async () => {
        const { account, tokens } = props;

        const trx0 = await tokens[tokenF].methods
            .mint(valueF + "0".repeat(18))
            .send({ from: account });
    };

    return (
        <div className="faucetform">
            <div className="faucetform__input-container">
                <input
                    className="faucetform__text"
                    type="number"
                    placeholder="0.0"
                    value={valueF}
                    onChange={(e) => {
                        setValueF(e.target.value);
                    }}
                />
                <Dropdown
                    className="faucetform__dropdown"
                    value={tokenF}
                    list={Object.keys(props.tokens)}
                    onSelectCallback={setTokenF}
                />
                <div className="faucetform__button-container">
                    <button
                        className="faucetform__button"
                        onClick={() => {
                            handleMint();
                        }}
                    >
                        Mint
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    account: state.account,
    tokens: state.tokens,
});
export default connect(mapStateToProps, {})(FaucetForm);
