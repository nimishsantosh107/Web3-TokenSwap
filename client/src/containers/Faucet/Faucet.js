import "./Faucet.css";
import React from "react";

import Hero from "../../components/Hero/Hero";
import FaucetForm from "../../components/FaucetForm/FaucetForm";

const Faucet = (props) => {
    return (
        <div className="faucet__container">
            <div className="faucet__hero">
                <Hero
                    title={"Want extra tokens to play with?"}
                    subtitle={"Mint your tokens here!"}
                />
            </div>
            <div className="faucet__body">
                <FaucetForm className="faucet__faucetform" />
            </div>
        </div>
    );
};

export default Faucet;
