import "./Swap.css";
import React from "react";

import SwapForm from "../../components/SwapForm/SwapForm";
import LiquidityView from "../../components/LiquidityView/LiquidityView";

const Swap = (props) => {
    return (
        <div className="swap__container">
            <SwapForm />
            <LiquidityView />
        </div>
    );
};

export default Swap;
