import "./LiquidityView.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getLiquidityInformation } from "../../actions";

const LiquidityView = (props) => {
    useEffect(() => {
        props.getLiquidityInformation();
    }, [props.swapsCounter, props.tokens]); // on swap / add liquidity, update liquidity info

    return (
        <div className="availliq">
            <span className="availliq__title">Available Liquidity</span>
            <div className="availliq__container">
                {Object.entries(props.liquidity).map((item, index) => (
                    <div key={item[0]} className="availliq__item-container">
                        <div className="availiq__inner_item-container">
                            <span className="availiq__innner_token">{item[0]}</span>
                            <span className="availiq__innner_value">{item[1]}</span>
                        </div>
                        {index === Object.entries(props.liquidity).length - 1 ? null : (
                            <hr className="availliq__hr" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    tokens: state.tokens,
    swapsCounter: state.swapsCounter,
    liquidity: state.liquidity,
});
export default connect(mapStateToProps, {
    getLiquidityInformation,
})(LiquidityView);
