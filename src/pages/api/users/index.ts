import { NextApiRequest, NextApiResponse } from "next";

// // // //

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ users: [{ name: "Jimmy" }] });
};

export async function getServerSideProps({ req }) {
    return {
        props: {
            username: "foobar",
            authenticated: true,
        },
    };
}
