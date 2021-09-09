import React from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "./DayList";
import useApplicationData from "hooks/useApplicationData";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "4pm",
//     interview: {
//       student: "Ellie Chungus",
//       interviewer: {
//         id: 1,
//         name: "Slyvan Ivan",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "5pm",
//   }
// ];

export default function Application() {

  let dailyAppointments = []
  let dailyInterviewers = []

  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  dailyAppointments = getAppointmentsForDay(state, state.day)
  dailyInterviewers = getInterviewersForDay(state, state.day)

  const mappedAppointments = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview)

    return <Appointment 
      key={`appointment-${appointment.id}`}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}
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
        days={state.days}
        day={state.day}
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
        <Appointment id="last" time="5pm" /> 
      </section>
    </main>
  );
}
