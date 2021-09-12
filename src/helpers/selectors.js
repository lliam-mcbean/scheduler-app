const getInterview = function (state, interview) {
  if (interview) {
    const returnObject = { ...interview };
    returnObject.interviewer = state.interviewers[`${interview.interviewer}`];
    return returnObject;
  }
  return null;
};

const getAppointmentsForDay = function (state, day) {
  const returnData = [];
  for (const thisDay of state.days) {
    if (thisDay.name === day) {
      for (const appointment of thisDay.appointments) {
        returnData.push(state.appointments[`${appointment}`]);
      }
    }
  }
  return returnData;
};

const getInterviewersForDay = function (state, day) {
  const returnData = [];
  for (const thisDay of state.days) {
    if (thisDay.name === day) {
      for (const interviewer of thisDay.interviewers) {
        returnData.push(state.interviewers[`${interviewer}`]);
      }
    }
  }
  return returnData;
};

export {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
};
