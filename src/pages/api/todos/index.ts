import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

// // // //

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

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

        try {
            switch (method) {
                case "GET":
                    // todoCollection// Get data from your database
                    todoCollection
                        .find({})
                        .project({
                            _id: true,
                            label: true,
                            done: true,
                        })
                        .sort({ operation_name: 1 })
                        .toArray((err, items) => {
                            // Handles find query error
                            if (err) {
                                res.status(500).json({
                                    error: "We fucked up, in GET",
                                });
                                return;
                            }

                            // Closes the DB connection
                            connection.close();

                            // Sends response to client
                            res.status(500).json({ items });
                        });
                    break;

                case "POST":
                    const newTodo = await todoCollection.insertOne({
                        label:
                            body.label ||
                            "No Label Defined " + Math.random().toString(),
                        done: false,
                    });

                    // Get data from your database
                    res.status(201).json({
                        ...newTodo.ops,
                    });

                    break;
                default:
                    res.setHeader("Allow", ["GET", "POST"]);
                    res.status(405).end(`Method ${method} Not Allowed`);
            }
        } catch (e) {
            res.status(500).end(`Something went wrong`);
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
