import "./LiquidityView.css";
import React from "react";

const LiquidityView = (props) => {
    return (
        <div className="availliq">
            <span className="availliq__title">Available Liquidity</span>
            <div className="availliq__container">
                {props.list.map((item, index) => (
                    <div key={item} className="availliq__item-container">
                        <div className="availiq__inner_item-container">
                            <span className="availiq__innner_token">ETH</span>
                            <span className="availiq__innner_value">1.443465</span>
                        </div>
                        {index === props.list.length - 1 ? null : <hr className="availliq__hr" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiquidityView;
