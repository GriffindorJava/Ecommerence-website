import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";

const OPINION_ADD_URL = "http://localhost:8080/test/add-opinion"

const OpinionAdd = () => {
    let { pid } = useParams();
    const [text, setText] = useState("");
    const [rating, setRating] = useState(2.5);
    const [hover, setHover] = useState(2.5);
    const AuthStr = 'Bearer '.concat(localStorage.getItem("jwtToken"));

    const handleRating = (e) => {
        setRating(parseFloat(e.target.value));
    };

    const handleText = (e) => {
        setText(e.target.value);
    };

    const handleSave = () => {
        let data = {
            description: text,
            product_id: pid,
            user_id: "1",
            rating: rating
        }
        console.log(data);
        axios.post(OPINION_ADD_URL, data, { headers: { Authorization: AuthStr } }).then(res => {
            console.log(res.data);
            window.location.reload(false);
        }).catch(err => {
            console.log(err.response.data);
        })
    };

    return (
        <Card sx={{ flexGrow: 1, margin: 1 }}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TextField
                        value={text}
                        id="opinion"
                        label="Your opinion"
                        multiline
                        maxRows={6}
                        onChange={handleText}
                        autoComplete="off"
                        inputProps={{
                            pattern: '^[A-Z]{1}[a-z]{5,100}$'
                        }}
                        sx={{ flexGrow: 1, margin: 1 }}
                    />
                    <Box textAlign='center'>
                        <Box sx={{
                            fontSize: 27,
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Rating name="half-rating-read" value={rating} onChange={handleRating}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }} max={5} min={0} precision={0.5} sx={{ fontSize: 27 }} />
                            <Typography style={{ marginLeft: 5 }} sx={{ fontSize: 20, minWidth: 30 }}>
                                {hover !== -1 ? hover : rating}
                            </Typography>
                        </Box>
                        <Button onClick={handleSave} sx={{ fontSize: 20 }}>
                            Add
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
};

export default OpinionAdd;
