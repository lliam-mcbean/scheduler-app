import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const mappedData = props.days.map((data) => (
    <DayListItem
      name={data.name}
      spots={data.spots}
      selected={data.name === props.day}
      setDay={props.setDay}
      key={data.id}
    />
  ));
  return (
    <ul>
      {mappedData}
    </ul>
  );
}
