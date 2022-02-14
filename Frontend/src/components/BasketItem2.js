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


const BasketItem2 = (props) => {
    const [id, setId] = useState(props.id);
    const [name, setName] = useState(props.name);
    const [rating, setRating] = useState(props.rating);
    const [quantity, setQuantity] = useState(props.quantity);
    const [price, setPrice] = useState(props.price);
    const [imagePath, setImagePath] = useState(props.imagePath);
    const [unitsInStock, setUnitsInStock] = useState(props.unitsInStock);

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
                        image={imagePath}
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
                                        {rating}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item >
                                <Typography sx={{ color: 'black', display: 'block', fontSize: 20 }}>
                                    {price} ({quantity * price}) PLN
                                </Typography>
                            </Grid>
                            <Grid item>
                            <Box sx={{display: 'flex'}}>
                                <Typography sx={{ fontSize: 26 }}>
                                    {quantity}
                                </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

export default BasketItem2
