import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "./DayList";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "4pm",
    interview: {
      student: "Ellie Chungus",
      interviewer: {
        id: 1,
        name: "Slyvan Ivan",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 4,
    time: "5pm",
  }
];

export default function Application(props) {

  const [day, setDay] = useState("Monday")
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('/api/days')
      .then((response) => {
        console.log(response)
      })
  }, [])

  const mappedAppointments = appointments.map(appointment => {
    return <Appointment 
      key={`appointment-${appointment.id}`}
      {...appointment}
    />
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={days}
        day={day}
        setDay={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {mappedAppointments}
      </section>
    </main>
  );
}
