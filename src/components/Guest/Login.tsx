import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {fetchUser} from "../../features/api/accountApi.ts";
import {createToken} from "../../utils/constants.ts";

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
const dispatch = useAppDispatch();
    const handleClickLogin= ()=> {
        dispatch(fetchUser(createToken(login, password)))

    }

    const handleClickClear= () => {
        setLogin('');
        setPassword('');
    }

    return (
        <>
            <label>Login:
                <input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    type="text"
                    />
            </label>
            <label>Password:
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    />
            </label>
            <button onClick={handleClickLogin}>Sing in</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    );
};

export default Login;