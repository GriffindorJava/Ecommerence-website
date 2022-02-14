import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from "react-redux";
import { registerUser } from '../services/user/auth/authActions'
import Menubar from "../components/Menubar";

const Register = () => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password1: '',
        password2: '',
        showPassword: false,
        rulesCheck: false
    })

    const [stateE, setStateE] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        password1: false,
        password2: false,
    })

    const resetRegisterForm = () => {
        setState({
            ...state,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password1: '',
            password2: '',
            showPassword: false,
            rulesCheck: false
        });
    };

    const handleClickShowPassword = () => {
        setState({
            ...state,
            showPassword: !state.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (regex, e) => {
        setState({ ...state, [e.target.id]: e.target.value })
        if (regex.test(e.target.value)) {
            setStateE({ ...stateE, [e.target.id]: false })
        } else {
            setStateE({ ...stateE, [e.target.id]: true })
        }
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        let alertMessage = "";
        if (stateE.firstName || state.firstName === '') {
            alertMessage = alertMessage + "\nIncorrect first name"
        } if (stateE.lastName || state.lastName === '') {
            alertMessage = alertMessage + "\nIncorrect last name"
        } if (stateE.email || state.email === '') {
            alertMessage = alertMessage + "\nIncorrect email"
        } if (stateE.phoneNumber || state.phoneNumber === '') {
            alertMessage = alertMessage + "\nIncorrect phone number"
        } if (stateE.password1 || state.password1 === '') {
            alertMessage = alertMessage + "\nIncorrect password 1"
        } if (stateE.password2 || state.password2 === '') {
            alertMessage = alertMessage + "\nIncorrect password 2"
        } if (state.password1 !== state.password2) {
            alertMessage = alertMessage + "\nPasswords do not match"
        } if (state.rulesCheck === false) {
            alertMessage = alertMessage + "\nAccept the RULES"
        }
        if (alertMessage !== "") {
            alert(alertMessage)
        } else {
            dispatch(registerUser(state.firstName, state.lastName, state.email, state.phoneNumber, state.password1))
                .then((response) => {
                    //setShow(true);
                    //setMessage(response.message);
                    resetRegisterForm();
                    ///setTimeout(() => {
                    //   setShow(false);
                    //   props.history.push("/login");
                    //}, 2000);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div >
            <Menubar/>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Grid
                    component="form"
                    container columns={{ xs: 12 }}
                    spacing={3}
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ maxWidth: '70%' }}
                    autoComplete="off"
                >
                    <Grid item>
                        <TextField
                            required
                            value={state.firstName}
                            error={stateE.firstName}
                            id="firstName"
                            label="First Name"
                            helperText={stateE.firstName ? "Incorrect entry." : false}
                            onChange={(e) => handleChange(/^[A-Z]{1}[a-z]{1,20}$/, e)}
                            inputProps={{
                                pattern: '^[A-Z]{1}[a-z]{1,20}$'
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            value={state.lastName}
                            error={stateE.lastName}
                            id="lastName"
                            label="Last Name"
                            helperText={stateE.lastName ? "Incorrect entry." : false}
                            onChange={(e) => handleChange(/^[A-Z]{1}[a-z]{1,20}$/, e)}
                            inputProps={{
                                pattern: '^[A-Z]{1}[a-z]{1,20}$'
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            value={state.email}
                            error={stateE.email}
                            id="email"
                            label="E-mail"
                            helperText={stateE.email ? "Incorrect entry." : false}
                            onChange={(e) => handleChange(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, e)}
                            inputProps={{
                                pattern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            value={state.phoneNumber}
                            error={stateE.phoneNumber}
                            id="phoneNumber"
                            label="Phone Number"
                            helperText={stateE.phoneNumber ? "Incorrect entry." : false}
                            onChange={(e) => handleChange(/^[1-9]{1}[0-9]{8}$/, e)}
                            inputProps={{
                                pattern: '^[1-9]{1}[0-9]{8}$'
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            value={state.password1}
                            error={stateE.password1}
                            id="password1"
                            label="Password"
                            type={state.showPassword ? 'text' : 'password'}
                            helperText={stateE.password1 ? "Incorrect entry." : false}
                            onChange={(e) => handleChange(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, e)}
                            inputProps={{
                                pattern: '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'   //Minimum eight characters, at least one letter and one number
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            value={state.password2}
                            error={stateE.password2}
                            id="password2"
                            label="Repeat password"
                            type={state.showPassword ? 'text' : 'password'}
                            helperText={stateE.password2 ? "Incorrect entry." : false}
                            onChange={(e) => handleChange(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, e)}
                            inputProps={{
                                pattern: '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <FormControlLabel control={<Checkbox onClick={(e) => setState({ ...state, rulesCheck: !state.rulesCheck })} />} label='Yes, i have read the RULES' />
                    </Grid>
                    <Grid item>
                        <Button onClick={handleSubmit} >Submit</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Register
