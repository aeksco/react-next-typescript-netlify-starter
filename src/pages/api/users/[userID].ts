export default (req, res) => {
    const {
        query: { userID, name },
        method,
    } = req;

    switch (method) {
        case "GET":
            // Get data from your database
            res.status(200).json({ id: userID, name: `User ${userID}` });
            break;
        case "PUT":
            // Update or create data in your database
            res.status(200).json({
                id: userID,
                name: name || `User ${userID}`,
            });
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
