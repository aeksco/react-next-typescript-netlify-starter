import { withRouter, Router } from "next/router";
import React, { useState, useEffect } from "react";

// // // //

function TodoEditPage(props: { router: Router }) {
    const { router } = props;
    const todoID = String(router.query.todoID);

    const [hasError, setErrors] = useState(false);
    const [item, setItem] = useState({});

    async function fetchData() {
        const res = await fetch(`/api/todos/${todoID}/`);
        res.json()
            .then(res => setItem(res))
            .catch(err => setErrors(err));
    }

    async function save(params) {
        // Default options are marked with *
        await fetch(`/api/todos/${todoID}/`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "manual", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({ ...params }), // body data type must match "Content-Type" header
        });

        // Redirect to the TodoShow page
        router.push(`/todos/${todoID}`);
        // parses JSON response into native JavaScript objects
        // return response.json();
    }

    useEffect(() => {
        fetchData();
    }, [todoID]);

    return (
        <div className="px-10 py-10">
            <h1 className="text-xl">Todo Edit</h1>
            <button
                onClick={() => {
                    save({
                        // @ts-ignore
                        label: item.label,
                        done: true,
                    });
                }}
            >
                Set Done
            </button>
            <pre>{JSON.stringify({ item }, null, 4)}</pre>
            <hr />
        </div>
    );
}

export default withRouter(TodoEditPage);
