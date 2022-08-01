import React from "react";

import Hero from "../../components/Hero/Hero";
import SwapForm from "../../components/SwapForm/SwapForm";
import LiquidityView from "../../components/LiquidityView/LiquidityView";
import "./Swap.css";

const Swap = (props) => {
    return (
        <div className="swap__container">
            <div className="swap__hero">
                <Hero
                    title={"Soap is a cutting-edge dex?"}
                    subtitle={"It works with NERC223 tokens! Pretty useless."}
                />
            </div>
            <div className="swap__body">
                <SwapForm />
                <LiquidityView />
            </div>
        </div>
    );
};

export default Swap;
