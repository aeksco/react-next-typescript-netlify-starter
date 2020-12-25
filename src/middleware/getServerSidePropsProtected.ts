import { withSSRContext } from "aws-amplify";

export async function getServerSidePropsProtected({ req, res }) {
    const { Auth } = withSSRContext({ req });
    try {
        const user = await Auth.currentAuthenticatedUser();
        return {
            props: {
                authenticated: true,
                username: user.attributes.email,
            },
        };
    } catch (err) {
        // res.redirect("/profile");
        console.log(res);
        return {
            props: {
                authenticated: false,
            },
        };
    }
}
