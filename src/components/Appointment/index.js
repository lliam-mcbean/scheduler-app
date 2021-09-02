import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

// id={1}
// time="12pm"
// interview={{ student: "Lydia Miller-Jones", interviewer }}

export default function Appointment({time, interview}) {
    return (
        <article className="appointment">
            <Header time={time} />
            {interview ? 
                <Show 
                    student={interview.student}
                    interviewer={interview.interviewer}
                /> : 
                <Empty 
                />
            }
        </article>
    )
}