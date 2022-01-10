import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CardActionArea, getAccordionDetailsUtilityClass } from '@mui/material';
import { Link } from "react-router-dom";


const BasketItem = (props) => {
    const [id, setId] = useState(props.id);
    const [name, setName] = useState(props.name);
    const [rating, setRating] = useState(props.rating);
    const [number, setNumber] = useState(props.number);
    const [price, setPrice] = useState(props.price);
    const [unitsInStock, setUnitsInStock] = useState(props.unitsInStock);

    const handleDelete = () => {
        props.onDelete(id);
        localStorage.removeItem(id)
    };

    const [count, setCount] = useState(number);

    const handleIncrement = () => {
        if(number<unitsInStock){
            setNumber(number => number+1);
            getData(number);
            localStorage.setItem(id, number)
            console.log(number);
        }
    };

    const handleDecrement = () => {
        if(number>1){
            setNumber(number => number-1);
            getData(number);
            localStorage.setItem(id, number)
            console.log(number);
        }
    };

    function getData(value){
        return value;
    };

    return (
        <Card style={{ margin: 10 }} sx={{ flexGrow: 1 }}>
            <CardContent>
                <Box sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        height="160"
                        style={{
                            width: "auto",
                            margin: "5px"
                        }}
                        image="/assets/amarena.jpg"
                        alt=""
                    />
                    <Grid
                        container
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                    >
                        <Typography sx={{ fontSize: 30 }} component={Link} to={'/product/'+id}>
                            {name}
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item >
                                <Box sx={{display: 'flex'}}>
                                    <Rating name="half-rating-read" value={3} precision={0.1} readOnly sx={{ fontSize: 27 }} />
                                    <Typography sx={{ fontSize: 20 }}>
                                        {rating} ({10})
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item >
                                <Typography sx={{ color: 'black', display: 'block', fontSize: 20 }}>
                                    {price} ({number * price}) PLN
                                </Typography>
                            </Grid>
                            <Grid item>
                            <Box sx={{display: 'flex'}}>
                                <IconButton
                                    sx={{ color: 'black', display: 'block', fontSize: 20 }}
                                onClick={handleDecrement}
                                //disableRipple
                                >
                                    <RemoveIcon fontSize="inherit" />
                                </IconButton >

                                <Typography sx={{ fontSize: 26 }}>
                                    {number}
                                </Typography>

                                <IconButton
                                    sx={{ color: 'black', display: 'block', fontSize: 20 }}
                                onClick={handleIncrement}
                                //disableRipple
                                >
                                    <AddIcon fontSize="inherit" />
                                </IconButton >

                                <IconButton
                                    sx={{ color: 'black', display: 'block', fontSize: 20 }}
                                    onClick={handleDelete}
                                >
                                    <DeleteOutlineOutlinedIcon fontSize="inherit" />
                                </IconButton >
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

export default BasketItem
