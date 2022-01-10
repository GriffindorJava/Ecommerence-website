import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const AddressCardEdit = (props) => {
    const [street, setStreet] = useState(props.street);
    const [streetNumber, setStreetNumber] = useState(props.streetNumber);
    const [postalCode, setPostalCode] = useState(props.postalCode);
    const [city, setCity] = useState(props.city);
    const [country, setCountry] = useState(props.country);


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
                    defaultValue={street}
                    inputProps={{
                        pattern: '[A-Za-z]{2,}'
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    id="street number"
                    label="Street number"
                    defaultValue={streetNumber}
                    inputProps={{
                        pattern: '[0-9]{1,}'
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    id="postal code"
                    label="Postal code"
                    defaultValue={postalCode}
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
                    defaultValue={city}
                    inputProps={{
                        pattern: '[A-Za-z]{2,}'
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    required
                    id="country"
                    label="Country"
                    defaultValue={country}
                    inputProps={{
                        pattern: '[A-Za-z]{2,}'
                    }}
                />
            </Grid>
            <Grid item xs={4} />
        </Grid>
    )
}

export default AddressCardEdit
