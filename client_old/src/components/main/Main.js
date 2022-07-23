import "./Main.css";
import React from "react";
import Dropdown from "./Dropdown";

const Main = (props) => {
    return (
        <div className="main">
            <div className="main__gap"></div>
            <div className="main__container">
                <div className="main__dropdowncontainer">
                    <div className="main__dropdown">
                        <Dropdown
                            handleSelected={props.dropdownHandleSelectedFrom}
                            initialTitle="Swap From"
                            tokenBalance={props.tokenBalance.from}
                            list={props.tokenList}
                            isEditable={true}
                            handleAmountInputChange={props.handleAmountInputChange}
                        />
                    </div>
                    <div className="main__dropdown">
                        <Dropdown
                            handleSelected={props.dropdownHandleSelectedTo}
                            initialTitle="Swap To"
                            tokenBalance={props.tokenBalance.to}
                            list={props.tokenList}
                        />
                    </div>
                    <button onClick={props.handleSwap} className="main__swapbutton">
                        Swap
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Main;
