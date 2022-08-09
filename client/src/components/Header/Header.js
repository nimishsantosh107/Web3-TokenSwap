import "./Header.css";
import React, { useState } from "react";

import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import BlockieIdenticon from "./BlockieIdenticon";
import { connectWallet } from "../../actions";

const Header = (props) => {
    const [walletConnected, setWalletConnected] = useState(false);
    const windowLocation = useLocation();

    const handleConnectWallet = (e) => {
        props.connectWallet();
        setWalletConnected(true); // does it re-render if same as prev value?, handle failure case
    };

    const getNavbarJSX = () => {
        const nameURLList = [
            { name: "Swap", url: "/" },
            { name: "Liquidity", url: "/liquidity" },
            { name: "Faucet", url: "/faucet" },
        ];

        return (
            <nav className="header__nav">
                {nameURLList.map((item) => {
                    return (
                        <Link
                            key={item.url}
                            to={item.url}
                            className={
                                "header__navitem " +
                                (windowLocation.pathname === item.url
                                    ? "header__navitem--active"
                                    : "")
                            }
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        );
    };

    const getWalletStatusJSX = () => {
        // if not connected
        if (!walletConnected) {
            return (
                <div
                    className="header__walletstatus header__walletstatus--inactive"
                    onClick={handleConnectWallet}
                >
                    <span>Connect Wallet</span>
                </div>
            );
        } else {
            return (
                <div className="header__walletstatus header__walletstatus--active">
                    <div className="header__network">
                        <div className="header__statuscolor"></div>
                        <span>{props.network}</span>
                    </div>
                    <div className="header__iconcontainer">
                        <BlockieIdenticon
                            id="blockies"
                            address={props.account}
                            diameter={26}
                            borderRadius="50%"
                        />
                    </div>
                </div>
            );
        }
    };

    return (
        <header className="header">
            {/* LOGO */}
            <div className="header__spacer--1"></div>
            <Link to="/" className="header__logo">
                Soap
            </Link>
            <div className="header__spacer--2"></div>
            {/* NAV */}
            {getNavbarJSX()}
            <div className="header__spacer--3"></div>
            {/* WALET STATUS */}
            {getWalletStatusJSX()}
            {/* walletConnected */}
            <div className="header__spacer--1"></div>
        </header>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        account: state.account,
        network: state.network,
    };
};

export default connect(mapStateToProps, {
    connectWallet,
})(Header);
