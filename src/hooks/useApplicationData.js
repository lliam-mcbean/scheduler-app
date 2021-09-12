import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));
  const setAppointments = (appointments) => setState((prev) => ({ ...prev, appointments }));
  const setInterviewers = (interviewers) => setState((prev) => ({ ...prev, interviewers }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((results) => {
      setInterviewers(results[2].data);
      setAppointments(results[1].data);
      setDays(results[0].data);
    });
  }, []);

  const bookInterview = (id, interview) => axios.put(`/api/appointments/${id}`, { interview }).then(() => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };

    const days = getSpots(newState);
    setState((prev) => ({ ...prev, appointments, days }));
  });

  const deleteInterview = (id) => axios.delete(`/api/appointments/${id}`).then(() => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newState = {
      ...state,
      appointments,

    };

    const days = getSpots(newState);
    setState((prev) => ({ ...prev, appointments, days }));
  });

  const getSpots = (data) => {
    let newDay = {};
    let counter = 0;

    for (const day of data.days) {
      if (day.name === data.day) {
        newDay = { ...day };

        for (let i = 0; i < day.appointments.length; i++) {
          const dailyAppointment = day.appointments[i];

          if (data.appointments[dailyAppointment].interview === null) {
            counter++;
          }
        }
      }
    }

    const newDays = [
      ...state.days,
    ];

    newDay.spots = counter;
    newDays[newDay.id - 1] = newDay;

    return newDays;
  };

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  };
}
