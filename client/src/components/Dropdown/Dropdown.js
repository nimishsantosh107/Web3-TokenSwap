import "./Dropdown.css";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
            dropdownTitle: this.props.defaultTitle,
        };
    }

    toggleList = () => {
        this.setState((prevState) => ({
            isListOpen: !prevState.isListOpen,
        }));
    };

    handleOnSelect = (selectedItem) => {
        this.setState({
            dropdownTitle: selectedItem,
            isListOpen: false,
        });
        this.props.handleSelectedItem(selectedItem);
    };

    render() {
        const { isListOpen, dropdownTitle } = this.state;
        const { list } = this.props;

        return (
            <div className="dropdown">
                <button type="button" className="dropdown__header" onClick={this.toggleList}>
                    <div className="dropdown__header-title">{dropdownTitle}</div>
                    {isListOpen ? (
                        <FontAwesomeIcon
                            className="dropdown__header-icon"
                            icon={faAngleUp}
                            size="1x"
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="dropdown__header-icon"
                            icon={faAngleDown}
                            size="1x"
                        />
                    )}
                </button>
                {isListOpen && (
                    <div role="list" className="dropdown__list">
                        {list.map((item, index) => (
                            <div className="dropdown__item-container" key={item}>
                                <button
                                    type="button"
                                    className="dropdown__item"
                                    onClick={() => this.handleOnSelect(item)}
                                >
                                    {item}
                                </button>
                                {index === list.length - 1 ? null : <hr className="dropdown__hr" />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default Dropdown;
