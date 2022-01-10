import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import AddressCard from "../components/AddressCard";
import Addresses from "../components/Addresses";

const Account = () => {
    return (
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
                            First Name  api
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography >
                            Last Name
                        </Typography>
                    </Grid>

                    <Grid item xs={3} sm={6}>
                        <Typography >
                            Last Name api
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography>
                            E-mail
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography>
                            E-mail api **
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography>
                            Phone
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={6}>
                        <Typography>
                            Phone api **
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
                                id="password old"
                                label="Old Password"
                                type="password"
                                inputProps={{
                                    pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$'   //Min 8, max 32 characters, at least one uppercase letter, one lowercase letter, one number, one special char
                                }}
                            />
                            <TextField
                                required
                                id="password1"
                                label="New password"
                                type="password"
                                inputProps={{
                                    pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$'   //Min 8, max 32 characters, at least one uppercase letter, one lowercase letter, one number, one special char
                                }}
                            />
                            <TextField
                                required
                                id="password2"
                                label="Repeat password"
                                type="password"
                                inputProps={{
                                    pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$'   //Min 8, max 32 characters, at least one uppercase letter, one lowercase letter, one number, one special char
                                }}
                            />
                            <Button>
                                Change
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={12}>
                        <Typography>
                            Addresses(max. 5)
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Addresses/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Account
