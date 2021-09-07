// name={'Ellie Chungus'}
// interviewers={interviewers}
// interviewer={interviewer.id}
// onSave={action("onSave")}
// onCancel={action("onCancel")}

import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
    console.log("THESE ARE FORM PROPS: ", props)
    const [interviewer, setInterviewer] = useState(props.interview !== null ? props.interview.interviewer.id : null);
    const [name, setName] = useState(props.interview !== null ? props.interview.student : "");

    const reset = () => {
        setName("")
        setInterviewer(null)
    }

    const cancel = () => {
        reset()
        props.onCancel()
    }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                <input
                    className="appointment__create-input text--semi-bold"
                    name="name"
                    type="text"
                    placeholder="Enter Student Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                </form>
                <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                <Button danger onClick={cancel}>Cancel</Button>
                <Button confirm onClick={(event) => {
                    // console.log("this is props.interviewers: ", props.interviewers)
                    props.onSave(name, interviewer)
                    .then(() => {
                        props.transition("SHOW")
                    })
                    .catch(() => {
                        props.transition("ERROR_SAVE", true)
                    })
                    }}>Save</Button>
                </section>
            </section>
        </main>
    )
}