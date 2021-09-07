export const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: []
});

export const setDay = day => setState({ ...state, day });
export const setDays = days => setState(prev => ({ ...prev, days }));
export const setAppointments = appointments => setState(prev => ({...prev, appointments}));
export const setInterviewers = interviewers => setState(prev => ({...prev, interviewers}));

export const bookInterview = (id, interview) => {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
      setState({
        ...state,
        appointments
      });
    })
}

const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.delete(`/api/appointments/${id}`)
  }