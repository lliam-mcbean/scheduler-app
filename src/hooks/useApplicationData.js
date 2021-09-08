import { React, useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Tuesday",
        days: [],
        appointments: {},
        interviewers: []
    });
    
    const setDay = day => setState({ ...state, day });
    const setDays = days => setState(prev => ({ ...prev, days }));
    const setAppointments = appointments => setState(prev => ({...prev, appointments}));
    const setInterviewers = interviewers => setState(prev => ({...prev, interviewers}));

    useEffect(() => {
        Promise.all([
          axios.get('/api/days'),
          axios.get('/api/appointments'),
          axios.get('/api/interviewers')
        ]).then((results) => {
          setInterviewers(results[2].data)
          setAppointments(results[1].data)
          setDays(results[0].data)
        });
    }, [])
    
    const bookInterview = (id, interview) => {
        // console.log(id, interview);
        return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
            const appointment = {
                ...state.appointments[id],
                interview: { ...interview }
            };
            const appointments = {
                ...state.appointments,
                [id]: appointment
            };
            const newState = {
                ...state,
                appointments
            }

            const days = getSpots(newState)
            setState(prev => {
                return {...prev, appointments, days}
            })
        })
    }
    
    const deleteInterview = (id) => {
        return axios.delete(`/api/appointments/${id}`).then(() => {
            const appointment = {
                ...state.appointments[id],
                interview: null
            };
            const appointments = {
                ...state.appointments,
                [id]: appointment
            };

            const newState = {
                ...state,
                appointments,
    
            }

            const days = getSpots(newState)
            setState(prev => {
                return {...prev, appointments, days}
            })

        })
    }

    const getSpots = (data) => {
            let newDay = {}
            let counter = 0
            // console.log(data.days)
            
            for (let day of data.days) {

                if (day.name === data.day) {
                    newDay = {...day}

                    for (let i = 0; i < day.appointments.length; i++) {
                        const dailyAppointment = day.appointments[i]

                        if (data.appointments[dailyAppointment].interview === null) {
                            counter ++;
                        }
                    }
                }
            }
            // console.log("whats up")
        
            const newDays = [
                ...state.days
            ]

            const newerDay = {
                ...newDays[newDay.id -1]
            }
            newerDay.spots = counter

            newDays[newDay.id - 1] = newerDay

            // console.log(...newDays)

            return newDays

            // const newState = {
            //     ...state,
            //     days: newDays
            // }

            // setState(prev => (newState));
            // console.log("NEW STATE:",newState)
            // console.log(counter)
            // console.log("OLD STATE :", state)
    }

    return {
        state,
        setDay,
        bookInterview,
        deleteInterview
    }
}