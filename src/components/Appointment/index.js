import React from 'react';
import "./styles.scss";
import Header from './Header';
import Form from './Form';
import Show from './Show';
import Error from './Error';
import Empty from './Empty';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

// id={1}
// time="12pm"
// interview={{ student: "Lydia Miller-Jones", interviewer }}

const EMPTY = "EMPTY";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment({time, interview, interviewers, id, bookInterview, deleteInterview}) {

    const { mode, transition, back } = useVisualMode(
        interview ? SHOW : EMPTY
    );

    const save = (name, interviewer) => {
        const interview = {
          student: name,
          interviewer
        };
        transition(SAVING)
        return bookInterview(id, interview)
    }
    
    const deleting = () => {
        transition(DELETING)
        return deleteInterview(id)
    }

    return (
        <article className="appointment">
            <Header time={time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
            <Show
                student={interview.student}
                interviewer={interview.interviewer}
                onDelete={() => {
                    transition(CONFIRM)
                }}
                onEdit={() => {
                    transition(CREATE)
                }}
            />
            )}
            {mode === CREATE && (
            <Form 
                interviewers = {interviewers}
                onCancel={() => back()}
                onSave={save}
                transition={transition}
                interview={interview}
            />
            )}
            {mode === SAVING && <Status message="Saving"/>}
            {mode === DELETING && <Status message="Deleting"/>}
            {mode === CONFIRM && <Confirm 
                message="Are you sure you would like to delete?"
                onConfirm={() => {
                    deleting()
                    .then(() => {
                        transition(EMPTY)
                    })
                    .catch(() => {
                        transition(ERROR_DELETE, true)
                    })
                }}
                onCancel={() => {
                    transition(SHOW)
                }}
            />}
            {mode === ERROR_SAVE && <Error 
                message="Could not edit appointment"
                onClose={() => {
                    back()
                }}
            />}
            {mode === ERROR_DELETE && <Error 
                message="Could not delete appointment"
                onClose={() => {
                    back()
                }}
            />}
        </article>
    )
}