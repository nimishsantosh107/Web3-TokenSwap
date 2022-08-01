import "./Liquidity.css";
import React from "react";

import Hero from "../../components/Hero/Hero";
import LiquidityForm from "../../components/LiquidityForm/LiquidityForm";
import LiquidityView from "../../components/LiquidityView/LiquidityView";

const Liquidity = (props) => {
    return (
        <div className="liquidity__container">
            <div className="liquidity__hero">
                <Hero
                    title={"Earn Passive Income!"}
                    subtitle={
                        "Deposit your tokens here to add liquidity to the swap. Get upto 2000% APY"
                    }
                />
            </div>
            <div className="liquidity__body">
                <LiquidityForm />
                <LiquidityView />
            </div>
        </div>
    );
};

export default Liquidity;
