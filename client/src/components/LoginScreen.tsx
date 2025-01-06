import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from '../main';
import { Button, TextField } from "@radix-ui/themes";

export const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [registerNew, setRegisterNew] = useState(false);
    const { setUser } = useUser();


    const submitLogin = () => {
        if (username !== '' && password !== '') {
            if (registerNew) {
                axios.post('/api/users/register', { username: username, password: password })
                    .then((response) => {
                        console.log(response.data);

                        setUser({
                            usernanme: username,
                            email: '',
                            isAuthenticated: true
                        });

                        setRegisterNew(false);
                        navigate('/');
                    }).catch((error) => {
                        console.error(error);
                    })
            }
            axios.post('/api/users/login', { username: username, password: password })
                .then((response) => {
                    console.log(response);
                    setUser({
                        usernanme: response.data.username,
                        email: '',
                        isAuthenticated: true,
                        is_admin: response.data.is_admin
                    });

                    navigate('/');
                }).catch((error) => {
                    console.error(error);
                })
        }
    }


    return (
        <div>
            <TextField.Root placeholder="User Name" variant="soft" radius="large" value={username} onChange={(e) => setUsername(e.target.value)} >
                <TextField.Slot />
            </TextField.Root>
            <TextField.Root placeholder="Password" type="password" variant="soft" radius="large" value={password} onChange={(e) => setPassword(e.target.value)}>
                <TextField.Slot />
            </TextField.Root>
            <Button onClick={submitLogin}>Submit</Button>
            <Button onClick={() => setRegisterNew(!registerNew)}>{!registerNew ? 'Register' : 'Log In'}</Button>

        </div>
    )
}