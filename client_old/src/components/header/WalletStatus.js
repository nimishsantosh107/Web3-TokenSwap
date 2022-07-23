import "./WalletStatus.css";
import React, { useState } from "react";
import BlockieIdenticon from "./BlockieIdenticon";

const WalletStatus = (props) => {
    var accountBorder = props.accountAddress ? "border-green-500" : "border-red-500";
    var accountShadowColor = props.accountAddress ? "#00d84f" : "#dc2c00";
    document.documentElement.style.setProperty("--shadow", accountShadowColor);

    const getRenderContent = () => {
        return (
            <div className="status">
                <div className="status__network">{props.networkId}</div>
                <div className={`status__account ${accountBorder}`}>
                    <div className="status__icon">
                        <BlockieIdenticon
                            id="blockies"
                            address={props.accountAddress}
                            diameter={20}
                            borderRadius="15%"
                        />
                    </div>

                    <span className="status__address">
                        {props.accountAddress.substring(0, 6) +
                            "..." +
                            props.accountAddress.substring(42 - 4, 42)}
                    </span>
                </div>
            </div>
        );
    };

    return <div>{getRenderContent()}</div>;
};

export default WalletStatus;
