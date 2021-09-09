import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
    const dayClass = classnames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0
    });
    const textInput = () => {
        if (props.spots === 0) {
            return 'no spots remaining'
        }
        if (props.spots === 1) {
            return '1 spot remaining'
        }
        return props.spots + ' spots remaining'
    };

    return (
        <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{textInput()}</h3>
        </li>
    );
}