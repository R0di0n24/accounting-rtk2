import {useAppSelector} from "../../app/hooks.ts";

const ProfileData = () => {
    const user = useAppSelector(state => state.user);
    return (
        <div>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Login: {user.login}</p>
            <ul>
                {user.roles.map(role=> <li key={role}>Roles: {role}</li>)}
            </ul>
        </div>
    );
};

export default ProfileData;