import "./LiquidityForm.css";
import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import Dropdown from "../Dropdown/Dropdown";
import { liquidityUpdateCounter, fetchBalance } from "../../actions";

const LiquidityForm = (props) => {
    const [inputAmountStr, setInputAmountStr] = useState("");
    const [tokenL, setTokenL] = useState("");

    useEffect(() => {
        setTokenL(Object.keys(props.tokens)[1]);
    }, [props.tokens]);

    useEffect(() => {
        props.fetchBalance(tokenL);
    }, [tokenL]);

    const handleDeposit = async () => {
        const { account, contracts, tokens } = props;

        const trx = await tokens[tokenL].methods
            .transfer(contracts.swapContract._address, inputAmountStr + "0".repeat(18))
            .send({ from: account });
        props.liquidityUpdateCounter();
        props.fetchBalance(tokenL);
    };

    const handleWithdraw = async () => {
        const { account, contracts, tokens } = props;

        const tokenLP = tokens[Object.keys(tokens)[0]];
        const amount = inputAmountStr + "0".repeat(18);

        const trx0 = await tokenLP.methods
            .approve(contracts.swapContract._address, amount)
            .send({ from: account });

        const trx1 = await contracts.swapContract.methods
            .withdrawToken(tokenL, amount)
            .send({ from: account });

        props.liquidityUpdateCounter();
        props.fetchBalance(tokenL);
    };

    return (
        <div className="liqform">
            <div className="liqform__input-container">
                <input
                    className="liqform__text"
                    type="number"
                    placeholder="0.0"
                    value={inputAmountStr}
                    onChange={(e) => {
                        setInputAmountStr(e.target.value);
                    }}
                />
                <Dropdown
                    className="liqform__dropdown"
                    value={tokenL}
                    list={Object.keys(props.tokens)}
                    onSelectCallback={setTokenL}
                />
                <div className="liqform__button-container">
                    <button
                        className="liqform__button liqform__button-deposit"
                        onClick={() => {
                            handleDeposit();
                        }}
                    >
                        Deposit
                    </button>
                    <button
                        className="liqform__button"
                        onClick={() => {
                            handleWithdraw();
                        }}
                    >
                        Withdraw
                    </button>
                </div>
            </div>
            <div className="liqform__balance">
                <span>Balance: </span>
                <span>
                    <b>{String(props.tokenBalance).slice(0, props.tokenBalance.length - 18)} </b>
                    {tokenL}
                </span>
            </div>
            <div className="liqform__footer">
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
export default connect(mapStateToProps, {
    liquidityUpdateCounter,
    fetchBalance,
})(LiquidityForm);
