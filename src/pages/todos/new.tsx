import { withRouter, Router } from "next/router";
import React from "react";

// // // //

function TodoNewPage(props: { router: Router }) {
    const { router } = props;
    const [label, setLabel] = React.useState<string>("");
    async function save(params) {
        // Default options are marked with *
        await fetch(`/api/todos`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
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

        // Redirect to the TodoListing page
        router.push("/todos");
    }

    return (
        <div className="px-10 py-10">
            <h1 className="text-xl">Todo New</h1>
            <input
                value={label}
                onChange={e => {
                    setLabel(e.currentTarget.value);
                }}
            />
            <button
                onClick={() => {
                    save({
                        label,
                        done: false,
                    });
                }}
            >
                Save New ToDo
            </button>
            <hr />
        </div>
    );
}

export default withRouter(TodoNewPage);
