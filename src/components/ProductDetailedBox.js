import React, { useState } from "react";
import Box from '@mui/material/Box';
import "../css/Product.css";
import ImageSlider from "./ImageSlider";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const ProductDetailedBox = (props) => {
    const [id, setId] = useState(props.id);
    const [name, setName] = useState(props.name);
    const [imagePath, setImagePath] = useState(props.imagePath);
    const [rating, setRating] = useState(props.rating);
    const [ratingsNumber, setRatingsNumber] = useState(props.ratingsNumber);
    const [unitPrice, setUnitPrice] = useState(props.unitPrice);
    const [unitsInStock, setUnitsInStock] = useState(props.unitsInStock);

    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        if(count<unitsInStock){
            setCount(count+1);
        }
    };

    const handleDecrement = () => {
        if(count>1){
            setCount(count-1);
        }
    };

    const handleAddToBasket = () => {
        localStorage.setItem(id, count)
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ImageSlider />

            <Box sx={{
                width: 300,
                height: 300
            }}
            >
                <h1>{name}</h1>
                <div className='rating'>
                    <Rating name="half-rating-read" value={rating} precision={0.1} readOnly sx={{ fontSize: 27 }} />
                    <Typography sx={{ fontSize: 20 }}>
                        {rating} ({ratingsNumber})
                    </Typography>
                </div>
                <Typography variant="h4">
                    {unitPrice} PLN
                </Typography>
                <Typography variant="h5">
                    In stock: {unitsInStock}
                </Typography>
                <div className='rating'>
                    <IconButton
                        sx={{ color: 'black', display: 'block', fontSize: 50 }}
                        onClick={handleDecrement}
                        disableRipple
                    >
                        <RemoveIcon fontSize="inherit" />
                    </IconButton >

                    <Typography sx={{ fontSize: 50 }}>
                        {count}
                    </Typography>

                    <IconButton
                        sx={{ color: 'black', display: 'block', fontSize: 50 }}
                        onClick={handleIncrement}
                        disableRipple
                    >
                        <AddIcon fontSize="inherit" />
                    </IconButton >

                    <IconButton
                        sx={{ color: 'black', display: 'block', fontSize: 50 }}
                        onClick={handleAddToBasket}
                    >
                        <AddShoppingCartOutlinedIcon fontSize="inherit" />
                    </IconButton >
                </div>
            </Box>
        </div>
    )
}

export default ProductDetailedBox
