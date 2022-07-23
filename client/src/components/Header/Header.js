import "./Header.css";
import React, { useState } from "react";
import BlockieIdenticon from "./BlockieIdenticon";

const Header = (props) => {
    const [walletConnected, setWalletConnected] = useState(false);

    const handleConnectWallet = (e) => {
        props.handleConnectWallet();
        setWalletConnected(true);
    };

    const getNavbarJSX = () => {
        const nameURLList = [
            { name: "Swap", url: "/" },
            { name: "Liquidity", url: "/page2" },
        ];

        return (
            <nav className="header__nav">
                {nameURLList.map((item) => {
                    if (window.location.pathname === item.url) {
                        return (
                            <a key={item.url} href={item.url} className="header__navitem--active">
                                {item.name}
                            </a>
                        );
                    } else {
                        return (
                            <a key={item.url} href={item.url}>
                                {item.name}
                            </a>
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
                        <span>Rinkeby</span>
                    </div>
                    <div className="header__iconcontainer">
                        <BlockieIdenticon
                            id="blockies"
                            address={props.accountAddress}
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
            <a href="/" className="header__logo">
                Soap
            </a>
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

export default Header;
