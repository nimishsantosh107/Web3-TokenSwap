import "./Faucet.css";
import React from "react";

import FaucetForm from "../../components/FaucetForm/FaucetForm";

const Faucet = (props) => {
    return (
        <div className="faucet__container">
            <FaucetForm />
        </div>
    );
};

export default Faucet;
