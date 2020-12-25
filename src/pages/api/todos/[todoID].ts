import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

// // // //

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {
        method,
        body,
        query: { todoID },
    } = req;

    if (todoID === undefined) {
        res.status(500).json({ error: "Go fuck yourself loser" });
        return;
    }

    // Connect to MongoDB
    MongoClient.connect(DB_URL, async (err, connection) => {
        // Handle error
        if (err) {
            res.status(500).json({ error: "We fucked up." });
            return;
        }

        // Define a reference to the database
        const db = connection.db(DB_NAME);
        const todoCollection = db.collection("todos");

        switch (method) {
            case "GET":
                // Get single ToDo from your database
                const foundItem = await todoCollection.findOne({
                    _id: new ObjectId(String(todoID)),
                });
                res.status(200).json({ ...foundItem });
                break;

            case "PUT":
                const updatedTodo = await todoCollection.findOneAndUpdate(
                    {
                        _id: new ObjectId(String(todoID)),
                    },
                    {
                        $set: {
                            label: body.label,
                            done: body.done,
                        },
                    },
                );

                // Get data from your database
                res.status(201).json({
                    ...updatedTodo.value,
                });

                break;
            case "DELETE":
                const deletedTodo = await todoCollection.findOneAndDelete({
                    _id: new ObjectId(String(todoID)),
                });

                res.status(201).json({
                    ...deletedTodo.value,
                });

                break;
            default:
                res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    });
};

// // // //

// export async function getServerSideProps({ req }) {
//     return {
//         props: {
//             username: "foobar",
//             authenticated: true,
//         },
//     };
// }
