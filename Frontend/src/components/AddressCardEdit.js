import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const AddressCardEdit = (props) => {
    return (
        <Grid
            component="form"
            container columns={{ xs: 8 }}
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ width: '70%' }}
            autoComplete="off"
        >
            <Grid item xs={4}>
                <TextField
                    required
                    id="street"
                    label="Street"
                    value={props.state.street}
                    error={props.stateErr.street}
                    onChange={(e) => props.onChange(/^[A-Za-z ]{2,32}$/, e)}
                    inputProps={{
                        pattern: '^[A-Za-z ]{2,32}$'
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    id="street_number"
                    label="Street number"
                    value={props.state.street_number}
                    error={props.stateErr.street_number}
                    onChange={(e) => props.onChange(/^[0-9]{1,5}$/, e)}
                    inputProps={{
                        pattern: '[0-9]{1,5}'
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    id="postal_code"
                    label="Postal code"
                    value={props.state.postal_code}
                    error={props.stateErr.postal_code}
                    onChange={(e) => props.onChange(/^[0-9]{5}$/, e)}
                    inputProps={{
                        pattern: '[0-9]{5}'
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    id="city"
                    label="City"
                    value={props.state.city}
                    error={props.stateErr.city}
                    onChange={(e) => props.onChange(/^[A-Za-z ]{2,32}$/, e)}
                    inputProps={{
                        pattern: '^[A-Za-z ]{2,32}$'
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    id="country"
                    label="Country"
                    value={props.state.country}
                    error={props.stateErr.country}
                    onChange={(e) => props.onChange(/^[A-Za-z ]{2,32}$/, e)}

                    inputProps={{
                        pattern: '^[A-Za-z ]{2,32}$'
                    }}
                />
            </Grid>
            <Grid item xs={4} />
        </Grid>
    )
}

export default AddressCardEdit
