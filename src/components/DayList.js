import React from "react";
import DayListItem from "./DayListItem"
import "components/DayListItem.scss";

export default function DayList(props) {
    const mappedData = props.days.map(data => {
        return <DayListItem
            name={data.name}
            spots={data.spots}
            selected={data.name === props.day}
            setDay={props.setDay}
        />
    })
    return (
        <ul>
            {mappedData}
        </ul>
    )
}