import { getServerSidePropsProtected } from "../middleware/getServerSidePropsProtected";

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

export async function getServerSideProps({ req, res }) {
    return getServerSidePropsProtected({ req, res });
}
