import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import AddressCardEdit from "../components/AddressCardEdit";
import AddressCardShow from "../components/AddressCardShow";
import axios from "axios";

const ADDR_ADD_URL = "http://localhost:8080/test/add-address"
const ADDR_EDIT_URL = "http://localhost:8080/test/update-address"

const AddressCard = (props) => {
    const [state, setState] = useState(props.info);
    const [stateEd, setStateEd] = useState(props.info);
    const [stateEdErr, setStateEdErr] = useState({
        street: false,
        street_number: false,
        postal_code: false,
        city: false,
        country: false,
    })

    const [editState, setEditState] = useState(state.new);
    const [showState, setShowState] = useState(!editState);

    const handleEdit = () => {
        setEditState(true);
        setShowState(false);
    }

    const handleDelete = () => {
        props.onDelete(state.id);
        console.log('Delete', state.id)
    }

    const handleChange = (regex, e) => {
        setStateEd({ ...stateEd, [e.target.id]: e.target.value })
        if (regex.test(e.target.value)) {
            setStateEdErr({ ...stateEdErr, [e.target.id]: false })
        } else {
            setStateEdErr({ ...stateEdErr, [e.target.id]: true })
        }
    }

    const AuthStr = 'Bearer '.concat(localStorage.getItem("jwtToken"));

    const handleSave = () => {
        console.log('Save');
        setState(stateEd);
        console.log(state.new)
        if (state.id===-1) {
            let data = {
                city: stateEd.city,
                postal_code: stateEd.postal_code,
                street: stateEd.street,
                country: stateEd.country,
                street_number: stateEd.street_number
            }
            axios.post(ADDR_ADD_URL, data, { headers: { Authorization: AuthStr } }).then(res => {
                console.log(res.data)
                window.location.reload(false);
                setEditState(false);
                setShowState(true);
            }).catch(err => {
                console.log(err.response.data);
            })
        } else {
            console.log("EDIT")
            let data = {
                id: stateEd.id,
                city: stateEd.city,
                postal_code: stateEd.postal_code,
                street: stateEd.street,
                country: stateEd.country,
                street_number: stateEd.street_number
            }
            axios.put(ADDR_EDIT_URL, data, { headers: { Authorization: AuthStr } }).then(res => {
                console.log(res.data)
                setEditState(false);
                setShowState(true);
            }).catch(err => {
                console.log(err.response.data);
            })
        }
        {/* 

        */}
        //handleCancel();
    }

    const handleCancel = () => {
        if (state.id===-1) {
            handleDelete();
        } else {
            setEditState(false);
            setShowState(true);
        }
    }



    return (
        <Card sx={{ m: 2 , flexGrow: 0}}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {showState && <AddressCardShow state={state} />}
                    {editState && <AddressCardEdit state={stateEd} stateErr={stateEdErr} onChange={handleChange}/>}

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
