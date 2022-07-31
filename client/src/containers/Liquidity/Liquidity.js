import "./Liquidity.css";
import React from "react";

import LiquidityForm from "../../components/LiquidityForm/LiquidityForm";
import LiquidityView from "../../components/LiquidityView/LiquidityView";

const Liquidity = (props) => {
    return (
        <div className="liquidity__container">
            <LiquidityForm />
            <LiquidityView />
        </div>
    );
};

export default Liquidity;
