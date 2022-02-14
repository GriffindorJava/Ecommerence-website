import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import AddressCard from "../components/AddressCard";
import Addresses from "../components/Addresses";
import axios from "axios";
import Menubar from "../components/Menubar";

const ACC_URL = "http://localhost:8080/test/myaccount"
const PASS_URL = "http://localhost:8080/test/changePassword"

const Account = () => {
    const [info, setInfo] = useState([])
    const [state, setState] = useState({
        oldPassword: "",
        newPassword1: "",
        newPassword2: ""
    });
    
    const AuthStr = 'Bearer '.concat(localStorage.getItem("jwtToken")); 
    const getInfo = () => {
        axios.get(ACC_URL, { headers: { Authorization: AuthStr }}).then(res =>{
            const resp = res.data;
            setInfo(resp);
        })
        console.log(info)
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const handleChangePass = () => {
        let data = {
            newPassword: state.newPassword1,
            oldPassword: state.oldPassword
        };
        console.log(data)
        axios.post(PASS_URL, data, { headers: { Authorization: AuthStr }}).then(res =>{
            const resp = res.data;
            console.log(resp)
        })
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <div>
            <Menubar/>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '70% '
            }}>
                <Grid
                    container
                    justifyContent="space-evenly"
                    alignItems="center"
                    columns={{ xs: 6, sm: 12 }}
                >
                    <Grid item xs={3} sm={6}>
                        <Typography >
                            First Name
                        </Typography>
                    </Grid>

                    <Grid item xs={3} sm={6}>
                        <Typography >
                        {   info.first_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography >
                            Last Name
                        </Typography>
                    </Grid>

                    <Grid item xs={3} sm={6}>
                        <Typography >
                            {info.last_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography>
                            E-mail
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography>
                            {info.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography>
                            Phone
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography>
                            {info.phone_number}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography>
                            Change password
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Box>
                            <TextField
                                required
                                id="oldPassword"
                                label="Old Password"
                                value={state.oldPassword}
                                onChange={handleChange}
                                type="password"
                                inputProps={{
                                    pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$'   //Min 8, max 32 characters, at least one uppercase letter, one lowercase letter, one number, one special char
                                }}
                            />
                            <TextField
                                required
                                id="newPassword1"
                                label="New password"
                                value={state.newPassword1}
                                onChange={handleChange}
                                type="password"
                                inputProps={{
                                    pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$'   //Min 8, max 32 characters, at least one uppercase letter, one lowercase letter, one number, one special char
                                }}
                            />
                            <TextField
                                required
                                id="newPassword2"
                                label="Repeat password"
                                value={state.newPassword2}
                                onChange={handleChange}
                                type="password"
                                inputProps={{
                                    pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$'   //Min 8, max 32 characters, at least one uppercase letter, one lowercase letter, one number, one special char
                                }}
                            />
                            <Button onClick={handleChangePass}>
                                Change
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={12}>
                        <Typography>
                            Addresses(max.  5)
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Addresses/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </div>
    )
}

export default Account
