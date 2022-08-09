import "./SwapForm.css";
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import Dropdown from "../../components/Dropdown/Dropdown";
import { fetchBalance } from "../../actions";

const SwapForm = (props) => {
    const [token1, setToken1] = useState("");
    const [token2, setToken2] = useState("");
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");

    useEffect(() => {
        setToken1(Object.keys(props.tokens)[1]);
        setToken2(Object.keys(props.tokens)[2]);
    }, [props.tokens]);

    useEffect(() => {
        props.fetchBalance(token1);
    }, [token1]);

    const handleInputAmtChange = (value) => {
        setValue1(value);
        setValue2(value);
    };

    // ERROR
    const handleSwap = async () => {
        const { account, contracts, tokens } = props;

        const amount1 = value1 + "0".repeat(18);
        const amount2 = value2 + "0".repeat(18);

        tokens[token1].methods
            .approve(contracts.swapContract._address, amount1)
            .send({ from: account })
            .on("transactionHash", (hash) => {
                console.log(hash);
            })
            .on("confirmation", (confirmationNumber, receipt) => {})
            .on("receipt", (receipt) => {});

        contracts.swapContract.methods
            .swapTokens(token1, token2, amount1, amount2)
            .send({ from: account, gas: 5500000 })
            .on("transactionHash", (hash) => {
                console.log(hash);
            })
            .on("confirmation", (confirmationNumber, receipt) => {})
            .on("receipt", (receipt) => {
                props.liquidityUpdateCounter();
                props.fetchBalance(token1);
            });
    };

    return (
        <div className="swapform">
            <div className="swapform__input-container">
                <input
                    className="swapform__text"
                    type="number"
                    placeholder="0.0"
                    value={value1}
                    onChange={(e) => {
                        handleInputAmtChange(e.target.value);
                    }}
                />
                <Dropdown
                    className="swapform__dropdown"
                    value={token1}
                    list={Object.keys(props.tokens)}
                    onSelectCallback={setToken1}
                />
            </div>
            <hr className="swapform__hr" />
            <div className="swapform__input-container">
                <input
                    className="swapform__text"
                    type="number"
                    placeholder="0.0"
                    value={value2}
                    onChange={() => {}}
                    readOnly
                />
                <Dropdown
                    className="swapform__dropdown"
                    value={token2}
                    list={Object.keys(props.tokens)}
                    onSelectCallback={setToken2}
                />
            </div>

            <div className="swapform__button-container">
                <button
                    className="swapform__button"
                    onClick={() => {
                        handleSwap();
                    }}
                >
                    Swap
                </button>
            </div>
            <div className="swapform__balance">
                <span>Balance: </span>
                <span>
                    <b>{String(props.tokenBalance).slice(0, props.tokenBalance.length - 18)} </b>
                    {token1}
                </span>
            </div>
            <div className="swapform__footer">
                <span>Price: </span>
                <span>
                    <b>1 X = 1 Y</b>
                </span>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    account: state.account,
    contracts: state.contracts,
    tokens: state.tokens,
    tokenBalance: state.tokenBalance,
});
export default connect(mapStateToProps, { fetchBalance })(SwapForm);
