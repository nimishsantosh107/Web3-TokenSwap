import "./TransactionInfo.css";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faLink } from "@fortawesome/free-solid-svg-icons";

const TransactionInfo = (props) => {
    return (
        <div className="trxinfo">
            <span>{props.trxHash.slice(1, 21) + "..."}</span>
            <FontAwesomeIcon
                onClick={() => {
                    navigator.clipboard.writeText(props.trxHash);
                }}
                className="trxinfo__icon"
                icon={faCopy}
                size="1x"
            />
            <FontAwesomeIcon
                onClick={() => {
                    const rootURL = "https://rinkeby.etherscan.io/tx/";
                    window.open(rootURL + props.trxHash, "_blank");
                }}
                className="trxinfo__icon"
                icon={faLink}
                size="1x"
            />
        </div>
    );
};

export default TransactionInfo;
