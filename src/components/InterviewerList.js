// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

    const mappedInterviewers = props.interviewers.map((interviewer) => {

            return <InterviewerListItem
                        key= {`interviewer-${interviewer.id}`}
                        name={interviewer.name}
                        avatar={interviewer.avatar}
                        selected={interviewer.id === props.interviewer}
                        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
                    />
    })

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {mappedInterviewers}
            </ul>
        </section>
    )
}

InterviewerList.propTypes = {
    interviewer: PropTypes.number.isRequired,
    interviewers: PropTypes.array.isRequired,
    setInterviewer: PropTypes.func.isRequired
}