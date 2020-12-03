import { withRouter, Router } from "next/router";
import React, { useState, useEffect } from "react";

// // // //
function TodoShowPage(props: { router: Router }) {
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

    useEffect(() => {
        fetchData();
    }, [todoID]);

    return (
        <div className="px-10 py-10">
            <h1 className="text-xl">Todo Show</h1>
            <pre>{JSON.stringify({ item }, null, 4)}</pre>
            <hr />
        </div>
    );
}

export default withRouter(TodoShowPage);
