import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import "../css/Product.css";
import ImageSlider from "./ImageSlider";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useDispatch } from "react-redux";
import { addToCart } from "../services/cart/cartActions";
import axios from "axios";

const ProductDetailedBox = () => {
    let { pid } = useParams();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        unitPrice: "",
        imagePath: "",
        unitsInStock: "",
        average_rating: 0
    });

    const [quantity, setQuantity] = useState(1);

    const getProductInfo = () =>{
        axios.get('http://localhost:8080/test/product/'+pid).then(res =>{
            const item = res.data;
            setProduct(item);
            console.log(item);
        })
    };

    useEffect(() => {
        getProductInfo();
    }, []);

    const handleIncrement = () => {
        if (quantity < product.unitsInStock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const dispatch = useDispatch();

    const handleAddToBasket = () => {
        let id = parseInt(pid)
        let price = product.unitPrice
        dispatch(addToCart({ id, quantity, price}));
        localStorage.setItem(id, quantity)
    };

    useEffect(() => {
        console.log(product)
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ImageSlider images={[product.imagePath]}/>

            <Box sx={{
                width: 300,
                height: 300
            }}
            >
                <h1>{product.name}</h1>
                <div className='rating'>
                    <Rating name="half-rating-read" value={product.average_rating} precision={0.1} readOnly sx={{ fontSize: 27 }} />
                    <Typography sx={{ fontSize: 20 }}>
                        {product.average_rating} ({product.opinionCount})
                    </Typography>
                </div>
                <Typography variant="h4">
                    {product.unitPrice} PLN
                </Typography>
                <Typography variant="h5">
                    In stock: {product.unitsInStock}
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
                        {quantity}
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
