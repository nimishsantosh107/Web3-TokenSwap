import "./FaucetForm.css";
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import Dropdown from "../Dropdown/Dropdown";
import { fetchBalance } from "../../actions";

const FaucetForm = (props) => {
    const [tokenF, setTokenF] = useState("");
    const [valueF, setValueF] = useState("");

    useEffect(() => {
        setTokenF(Object.keys(props.tokens)[1]);
    }, [props.tokens]);

    useEffect(() => {
        props.fetchBalance(tokenF);
    }, [tokenF]);

    const handleMint = async () => {
        const { account, tokens } = props;

        tokens[tokenF].methods
            .mint(valueF + "0".repeat(18))
            .send({ from: account })
            .on("transactionHash", (hash) => {
                console.log(hash);
            })
            .on("confirmation", (confirmationNumber, receipt) => {})
            .on("receipt", (receipt) => {
                props.fetchBalance(tokenF);
            });
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
            </div>
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
            <div className="faucetform__balance">
                <span>Balance: </span>
                <span>
                    <b>{String(props.tokenBalance).slice(0, props.tokenBalance.length - 18)} </b>
                    {tokenF}
                </span>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    account: state.account,
    tokens: state.tokens,
    tokenBalance: state.tokenBalance,
});
export default connect(mapStateToProps, { fetchBalance })(FaucetForm);
