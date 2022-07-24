import "./Header.css";
import React, { useState } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import BlockieIdenticon from "./BlockieIdenticon";
import { connectWallet } from "../../actions";

const Header = (props) => {
    const [walletConnected, setWalletConnected] = useState(false);

    const handleConnectWallet = (e) => {
        props.connectWallet();
        setWalletConnected(true); // does it re-render if same as prev value?, handle failure case
    };

    const getNavbarJSX = () => {
        const nameURLList = [
            { name: "Swap", url: "/" },
            { name: "Liquidity", url: "/liquidity" },
        ];

        return (
            <nav className="header__nav">
                {nameURLList.map((item) => {
                    if (window.location.pathname === item.url) {
                        return (
                            <Link
                                key={item.url}
                                to={item.url}
                                className="header__navitem header__navitem--active"
                            >
                                {item.name}
                            </Link>
                        );
                    } else {
                        return (
                            <Link key={item.url} to={item.url} className="header__navitem">
                                {item.name}
                            </Link>
                        );
                    }
                })}
            </nav>
        );
    };

    const getWalletStatusJSX = (isWalletConnected) => {
        // if not connected
        if (!isWalletConnected) {
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
            {getWalletStatusJSX(walletConnected)}
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

export default connect(mapStateToProps, { connectWallet })(Header);
