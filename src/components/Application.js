import React from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "./DayList";
import useApplicationData from "hooks/useApplicationData";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

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
