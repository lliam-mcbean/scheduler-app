import React from 'react';
import "./styles.scss";
import Header from './Header';
import Form from './Form';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';

// id={1}
// time="12pm"
// interview={{ student: "Lydia Miller-Jones", interviewer }}

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment({time, interview, interviewers}) {

    const { mode, transition, back } = useVisualMode(
        interview ? SHOW : EMPTY
    );
 

    return (
        <article className="appointment">
            <Header time={time} />
            {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
            {mode === SHOW && (
            <Show
                student={interview.student}
                interviewer={interview.interviewer}
            />
            )}
            {mode === CREATE && (
                <Form 
                    interviewers = {interviewers}
                    onCancel={() => back()}
                />
            )}
        </article>
    )
}