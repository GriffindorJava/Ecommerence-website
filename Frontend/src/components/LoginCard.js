import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authenticateUser } from '../services//user/auth/authActions';

const LoginCard = (props) => {
    const initialState = {
        email: "",
        password: "",
    };

    const [user, setUser] = useState(initialState);

    const credentialChange = (event) => {
        const { id, value } = event.target;
        setUser({ ...user, [id]: value });
    };

    const dispatch = useDispatch();

    const handleClose = () => {
        props.closeMenu();
    };

    const validateUser = () => {
        console.log(user);
        dispatch(authenticateUser(user.email, user.password))
            .then((response) => {
                console.log(response.data);
                //return props.history.push("/home");
            })
            .catch((error) => {
                console.log(error.message);
                //setShow(true);
                resetLoginForm();
                //setError("Invalid email and password");
            });
    };

    const resetLoginForm = () => {
        setUser(initialState);
    };

    return (
        <Card sx={{ minWidth: 450 }}>
            <CardContent>
                <div>
                <div autoComplete="off"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                    <TextField
                        required
                        id="email"
                        label="E-mail"
                        value={user.email}
                        onChange={credentialChange}
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        value={user.password}
                        onChange={credentialChange}
                    />
                </div>
                <div autoComplete="off"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                    <Button onClick={handleClose} component={Link} to={'/register'}>Register</Button>
                    <Button onClick={validateUser}>Login</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginCard
