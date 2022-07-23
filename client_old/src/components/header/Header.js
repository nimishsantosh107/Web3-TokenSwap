import "./Header.css";
import React from "react";
import WalletStatus from "./WalletStatus";

const Header = (props) => {
    return (
        <header className="header">
            <div className="header__logo">
                <span>Swap</span>
            </div>
            <nav className="header__nav"></nav>
            <div className="header__walletstatus">
                <WalletStatus networkId={props.networkId} accountAddress={props.accountAddress} />
            </div>
        </header>
    );
};

export default Header;
