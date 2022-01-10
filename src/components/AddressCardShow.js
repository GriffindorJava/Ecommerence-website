import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const AddressCardShow = (props) => {
    const [street, setStreet] = useState(props.street);
    const [streetNumber, setStreetNumber] = useState(props.streetNumber);
    const [postalCode, setPostalCode] = useState(props.postalCode);
    const [city, setCity] = useState(props.city);
    const [country, setCountry] = useState(props.country);

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            sx={{ width: '70%' }}
        >
            <Typography>
                {street} {streetNumber}
            </Typography>
            <Typography>
                {postalCode} {city}
            </Typography>
            <Typography>
                {country}
            </Typography>
        </Grid>
    )
}

export default AddressCardShow
