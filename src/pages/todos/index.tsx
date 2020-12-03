import * as React from "react";
import { useQuery } from "react-query";
import Link from "next/link";

// // // //

type Item = {
    _id: string;
    label: string;
    done: boolean;
};

function ListItem(props: { item: Item }) {
    const { item } = props;
    return (
        <li
            className="flex py-4 flex-row w-full justify-between items-center border-2 border-t-0 border-l-0 border-r-0 border-gray-400"
            key={item._id}
        >
            <div className="flex items-center">
                {item.done && (
                    <p className="text-green-400 text-4xl">&#9745;</p>
                )}
                {!item.done && (
                    <p className="text-gray-400 text-4xl">&#9745;</p>
                )}
                <Link
                    href={{
                        href: `/todos/${item._id}`,
                        pathname: "/todos/[todoID]",
                        query: {
                            todoID: item._id,
                        },
                    }}
                >
                    <a href={`/todos/${item._id}`} className="ml-2">
                        {item.label}
                    </a>
                </Link>
            </div>
            <div className="flex">
                <Link
                    href={{
                        href: `/todos/${item._id}/edit`,
                        pathname: "/todos/[todoID]/edit",
                        query: {
                            todoID: item._id,
                        },
                    }}
                >
                    <a
                        href={`/todos/${item._id}/edit`}
                        className="btn bg-orange-600 text-white hover:bg-orange-700"
                    >
                        Edit
                    </a>
                </Link>
                <button className="btn bg-red-600 text-white hover:bg-red-700 ml-2">
                    Delete
                </button>
            </div>
        </li>
    );
}

// // // //

export default function() {
    const { isLoading, error, data } = useQuery("todoListing", () =>
        fetch("/api/todos").then(res => res.json()),
    );

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    return (
        <div className="px-10 py-10">
            <h1 className="text-xl">Todo Listing</h1>
            <Link href="/todos/new">
                <a href="/todos/new" className="ml-2">
                    New Todo Page
                </a>
            </Link>
            <div className="flex flex-col w-full">
                {data.items.map(item => (
                    <ListItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
