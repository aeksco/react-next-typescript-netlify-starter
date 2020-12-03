import { NextApiRequest, NextApiResponse } from "next";

// // // //

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case "GET":
            // Get data from your database
            res.status(200).json({
                todos: [{ id: 1, label: "Make Dinner", done: false }],
            });
            break;
        case "POST":
            // Get data from your database
            res.status(201).json({
                id: 1,
                label: "New Todo Item!",
                done: false,
            });
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
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
