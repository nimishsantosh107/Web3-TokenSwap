import "./Dropdown.css";
import React from "react";
import FontAwesome from "react-fontawesome";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isListOpen: false,
            headerTitle: this.props.initialTitle,
            amountInput: "",
        };
    }

    toggleList = () => {
        this.setState((prevState) => ({
            isListOpen: !prevState.isListOpen,
        }));
    };

    selectItem = (item) => {
        this.setState({
            headerTitle: item,
            isListOpen: false,
        });
        this.props.handleSelected(item);
    };

    onInputChange = (e) => {
        this.props.handleAmountInputChange(Number(e.target.value));
        this.setState({ amountInput: e.target.value });
    };

    getEditAmountJSX = () => {
        return this.props.tokenBalance && this.props.isEditable && this.props.tokenBalance > 0 ? (
            <div>
                <input
                    className="amountinput"
                    type="text"
                    value={this.state.amountInput}
                    onChange={this.onInputChange}
                ></input>
            </div>
        ) : null;
    };

    getTokenBalanceJSX = () => {
        return this.props.tokenBalance ? (
            <div className="balance">{this.props.tokenBalance}</div>
        ) : null;
    };

    render = () => {
        const { isListOpen, headerTitle } = this.state;
        const { list } = this.props;

        return (
            <div className="dd-wrapper">
                <button type="button" className="dd-header" onClick={this.toggleList}>
                    <div className="dd-header-title">{headerTitle}</div>
                    <div className="dd-header-editamount">{this.getEditAmountJSX()}</div>
                    <div className="dd-header-balance">{this.getTokenBalanceJSX()}</div>
                    <div className="dd-header-dropicon">
                        {" "}
                        {isListOpen ? (
                            <FontAwesome name="angle-up" />
                        ) : (
                            <FontAwesome name="angle-down" />
                        )}
                    </div>
                </button>
                {isListOpen && (
                    <div role="list" className="dd-list">
                        {list.map((item) => (
                            <button
                                type="button"
                                className="dd-list-item"
                                key={item}
                                onClick={() => this.selectItem(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };
}

export default Dropdown;
