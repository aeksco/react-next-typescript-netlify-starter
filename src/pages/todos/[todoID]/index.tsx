import { withRouter, Router } from "next/router";
import React, { useState, useEffect } from "react";

// // // //

export default withRouter((props: { router: Router }) => {
    const { router } = props;

    if (router.query.todoID === undefined) {
        return null;
    }

    const [hasError, setErrors] = useState(false);
    const [item, setItem] = useState({});

    const todoID = router.query.todoID;

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
});
