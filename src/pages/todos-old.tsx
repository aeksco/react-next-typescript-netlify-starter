import * as React from "react";

// // // //

// function Debug(props) {
//     return <pre>{JSON.stringify(props, null, 4)}</pre>;
// }

// // // //

type Item = {
    id: number;
    label: string;
    done: boolean;
};

function ItemForm(props: {
    name: string;
    onSubmit: (submittedName: string) => void;
}) {
    const [name, setName] = React.useState<string>(props.name);
    return (
        <form
            className="flex flex-row w-full"
            onSubmit={e => {
                e.preventDefault();

                props.onSubmit(name);
                setName("");
            }}
        >
            <input
                required
                className="border border-gray-500 rounded w-full py-2 px-2"
                placeholder="New Item"
                value={name}
                onChange={e => {
                    setName(e.currentTarget.value);
                }}
            />
            <button
                type="submit"
                className="btn bg-green-400 hover:bg-green-600 text-white ml-4"
            >
                &#10004;
            </button>
        </form>
    );
}

function ItemFormLayout(props: {
    name: string;
    onSubmit: (submittedName: string) => void;
}) {
    return (
        <div className="flex flex-row w-full mt-2 border-t border-b border-gray-400 py-4">
            <ItemForm {...props} />
        </div>
    );
}

// // // //

function ListConrols(props: {
    items: Item[];
    onChange: (updatedItems: Item[]) => void;
}) {
    const { items, onChange } = props;
    return (
        <div className="flex flex-row w-full justify-between mt-2 border-b border-gray-400 py-4">
            <button
                onClick={() => {
                    onChange(
                        items.map(i => {
                            return {
                                ...i,
                                done: true,
                            };
                        }),
                    );
                }}
                className="flex flex-grow justify-center btn bg-green-400 hover:bg-green-600 text-white mx-2"
            >
                Check All
            </button>
            <button
                onClick={() => {
                    onChange(
                        items.map(i => {
                            return {
                                ...i,
                                done: false,
                            };
                        }),
                    );
                }}
                className="flex flex-grow justify-center btn bg-gray-400 hover:bg-gray-600 text-white mx-2"
            >
                Uncheck All
            </button>
            <button
                onClick={() => {
                    onChange(items.filter(i => !i.done));
                }}
                className="flex flex-grow justify-center btn bg-red-400 hover:bg-red-600 text-white mx-2"
            >
                Remove All Completed
            </button>
            <button
                onClick={() => {
                    onChange([]);
                }}
                className="flex flex-grow justify-center btn bg-red-400 hover:bg-red-600 text-white mx-2"
            >
                Remove All
            </button>
        </div>
    );
}

// // // //

function ListItem(props: {
    item: Item;
    onChangeDone: () => void;
    onChangeName: (updatedName: string) => void;
    onRemove: () => void;
}) {
    const { item, onChangeName, onChangeDone, onRemove } = props;
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    return (
        <li
            className="flex py-4 flex-row w-full justify-between items-center border-2 border-t-0 border-l-0 border-r-0 border-gray-400"
            key={item.id}
        >
            <div className="flex items-center">
                <button
                    onClick={() => {
                        onChangeDone();
                    }}
                >
                    {item.done && (
                        <p className="text-green-400 text-4xl">&#9745;</p>
                    )}
                    {!item.done && (
                        <p className="text-gray-400 text-4xl">&#9745;</p>
                    )}
                </button>
                {!isEditing && (
                    <p
                        className="ml-2"
                        onClick={() => {
                            setIsEditing(true);
                        }}
                    >
                        {item.label}
                    </p>
                )}

                {isEditing && (
                    <div className="ml-4">
                        <ItemForm
                            name={item.label}
                            onSubmit={(updatedName: string) => {
                                onChangeName(updatedName);
                                setIsEditing(false);
                            }}
                        />
                    </div>
                )}
            </div>
            <div className="flex">
                <button
                    onClick={() => {
                        onRemove();
                    }}
                    className="btn bg-red-600 text-white hover:bg-red-700	"
                >
                    Remove
                </button>
            </div>
        </li>
    );
}

/**
 * TodoList
 * Renders a component for managing an Array<Item>
 * @param props.items - the array of `Item` instances being edited here
 */
function TodoList(props: { items: Item[] }) {
    const [items, setItems] = React.useState<Item[]>(props.items);

    function addItem(newItemName: string) {
        setItems([
            ...items,
            {
                id: Math.random(),
                label: newItemName,
                done: false,
            },
        ]);
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col w-full pt-4 items-center">
                <ItemFormLayout
                    name=""
                    onSubmit={updatedName => {
                        addItem(updatedName);
                    }}
                />
                <p className="text-lg text-gray-900 mt-4">
                    There's nothing left to do today :)
                </p>
                <p className="text-sm text-gray-500">
                    Go grab yourself a nice cold beer
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <ItemFormLayout
                name=""
                onSubmit={updatedName => {
                    addItem(updatedName);
                }}
            />
            <ListConrols items={items} onChange={setItems} />
            {items.map(item => {
                return (
                    <ListItem
                        key={item.id}
                        item={item}
                        onChangeDone={() => {
                            setItems(
                                items.map(i => {
                                    if (i.id === item.id) {
                                        return {
                                            ...item,
                                            done: !item.done,
                                        };
                                    }
                                    return i;
                                }),
                            );
                        }}
                        onChangeName={(updatedName: string) => {
                            setItems(
                                items.map(i => {
                                    if (i.id === item.id) {
                                        return {
                                            ...item,
                                            label: updatedName,
                                        };
                                    }
                                    return i;
                                }),
                            );
                        }}
                        onRemove={() => {
                            setItems(items.filter(i => i.id !== item.id));
                        }}
                    />
                );
            })}
        </div>
    );
}

// // // //

export default function() {
    return (
        <div className="px-10 py-10">
            <h1 className="text-xl">Todo List</h1>
            <TodoList
                items={[
                    { id: 1, label: "Brush teeth", done: false },
                    { id: 2, label: "Eat", done: true },
                    { id: 3, label: "Sleep", done: false },
                ]}
            />
        </div>
    );
}
