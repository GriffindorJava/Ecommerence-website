import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import AddressCardEdit from "../components/AddressCardEdit";
import AddressCardShow from "../components/AddressCardShow";

const AddressCard = (props) => {
    const [id, setId] = useState(props.id);
    const [street, setStreet] = useState(props.street);
    const [streetNumber, setStreetNumber] = useState(props.streetNumber);
    const [postalCode, setPostalCode] = useState(props.postalCode);
    const [city, setCity] = useState(props.city);
    const [country, setCountry] = useState(props.country);

    const [showState, setShowState] = useState(true);
    const [editState, setEditState] = useState(false);

    const handleEdit = () => {
        setEditState(true);
        setShowState(false);
    }

    const handleDelete = () => {
        props.onDelete(id);
        console.log('Delete', id)
    }

    const handleSave = () => {
        console.log('Save');
        handleCancel();
    }

    const handleCancel = () => {
        setEditState(false);
        setShowState(true);
    }



    return (
        <Card sx={{ m: 2 }}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {showState && <AddressCardShow street={street} streetNumber={streetNumber} postalCode={postalCode} city={city} country={country}/>}
                    {editState && <AddressCardEdit street={street} streetNumber={streetNumber} postalCode={postalCode} city={city} country={country}/>}

                    <Grid
                        container
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{ width: '30%' }}
                    >
                        <Grid item>
                            {showState ? 
                            <Button onClick={handleEdit}>
                                EDIT
                            </Button> : 
                            <Button onClick={handleSave}>
                                SAVE
                            </Button>
                            }
                            
                        </Grid>
                        <Grid item>
                        {showState ? 
                            <Button onClick={handleDelete}>
                                DELETE
                            </Button> : 
                            <Button onClick={handleCancel}>
                                CANCEL
                            </Button>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

export default AddressCard
