import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

const AddressCardShow = (props) => {

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            sx={{ width: '70%' }}
        >
            <Typography>
                {props.state.street} {props.state.street_number}
            </Typography>
            <Typography>
                {props.state.postal_code} {props.state.city}
            </Typography>
            <Typography>
                {props.state.country}
            </Typography>
        </Grid>
    )
}

export default AddressCardShow
