import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasketItems from '../components/BasketItems'
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from '../services/cart/cartActions'
import { emptyCart } from '../services/cart/cartActions'
import { Link } from "react-router-dom";
import Menubar from '../components/Menubar';
import axios from "axios";

const BASKET_URL = "http://localhost:8080/test/upToDateProductsInfo"

const Basket = () => {
    const items = useSelector((state) => state.cart.products);
    const [itemsAPI, setItemsAPI] = useState({
        products: [],
        totalPrice: 0
    });

    const dispatch = useDispatch();

    const handleDelete = (id, quantity, price) => {
        console.log(id)
        setItemsAPI({...itemsAPI, products: itemsAPI.products.filter((item) => item.id !== id), totalPrice : itemsAPI.totalPrice-quantity*price});
        dispatch(removeFromCart(id))
    };

    const handleEmptyCart = () => {
        console.log(items)
        dispatch(emptyCart());
        setItemsAPI({
            products: [],
            totalPrice: 0
        })
    }

    const getItems = () => {
        let items_mod = [];
        items.forEach(item => {
            items_mod.push({ product_id: item.id, quantity: item.quantity });
        });
        axios.post(BASKET_URL, { orderedProducts: items_mod }).then(res => {
            const products = res.data;
            setItemsAPI(products);
            console.log(products)
        })
        console.log(itemsAPI)
    }

    useEffect(() => {
        if (items && items.length > 0) {
            getItems();
        }
    }, []);

    return (
        <div>
            <Menubar/>

        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',         
        }}>

            <Grid
                container columns={{ xs: 12, sm: 12, md: 12, xl: 12, xxl: 12 }}
                spacing={4}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginLeft={1}
                marginRight={2}
            >
                {/* ITEMS */}
                <Grid item xs={12} md={9}  >
                    <BasketItems items={itemsAPI.products} handleEmptyCart={handleEmptyCart} handleDelete={handleDelete}/>
                </Grid>

                {/* SUMMUP */}
                <Grid item xs={12} md={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Card>
                        <CardContent sx={{

                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography sx={{ color: 'black', display: 'block', fontSize: 20 }}>
                                SUM: {itemsAPI.totalPrice} PLN
                            </Typography>
                            {(items && items.length > 0) &&
                                <Box textAlign='center'>
                                    <Button component={Link} to={'/order'}>
                                        ORDER
                                    </Button>
                                </Box>
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>



        </Box>
        </div>
    )
}

export default Basket
