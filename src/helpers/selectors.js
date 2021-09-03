const getAppointmentsForDay = (state, day) => {
    const returnData = []
    for(const thisDay of state.days) {
        if (thisDay.name === day) {
            for(const appointment of thisDay.appointments) {
                returnData.push(state.appointments[`${appointment}`])
            }
        }
    }
    return returnData;
}

module.exports = { getAppointmentsForDay }