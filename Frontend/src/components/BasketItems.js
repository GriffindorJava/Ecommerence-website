import React, { useEffect, useState } from "react";
import BasketItem from './BasketItem'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from '../services/cart/cartActions'
import { emptyCart } from '../services/cart/cartActions'
import axios from "axios";

const BASKET_URL = "http://localhost:8080/test/upToDateProductsInfo"

const BasketItems = (props) => {
    const [items, setItems] = useState(useSelector((state) => state.cart.products));

    return (
        <div>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography sx={{ color: 'black', display: 'block', fontSize: 20, marginLeft: 1}}>
                    Items
                </Typography>
                <Box sx={{  
                    flexGrow: 1
                }} />
                {(items && items.length > 0) &&
                    <Button onClick={props.handleEmptyCart}>
                        EMPTY CART
                    </Button>
                }

            </Box>
            {props.items.map((item) => (
                <div key={item.id}>
                    <BasketItem
                        id={item.id}
                        name={item.name}
                        rating={item.rating}
                        opinionCount={item.opinionCount}
                        quantity={items.find((item2) => item.id === item2.id).quantity}
                        price={item.unitPrice}
                        //unitsInStock={item.unitsInStock}
                        imagePath={item.imagePath}
                        handleDelete={props.handleDelete} />
                </div>
            ))}
        </div>
    )
}

export default BasketItems
