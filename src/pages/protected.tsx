import { withSSRContext } from "aws-amplify";

export default function Protected({ authenticated, username }) {
    if (!authenticated) {
        return <p>NOT AUTHENTICATED</p>;
    }
    return (
        <div>
            <p>Hello, {username} from SSR!</p>
        </div>
    );
}

export async function getServerSideProps({ req }) {
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
        return {
            props: {
                authenticated: false,
            },
        };
    }
}
