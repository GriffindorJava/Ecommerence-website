import React, { useEffect, useState } from "react";
import BasketItem2 from './BasketItem2'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import axios from "axios";

const BASKET_URL = "http://localhost:8080/test/upToDateProductsInfo"

const BasketItems2 = (props) => {
    const [items, setItems] = useState(useSelector((state) => state.cart.products));
    const [itemsAPI, setItemsAPI] = useState({
        products: [],
        totalPrice: 0
    });

    const getItems = () => {
        let items_mod = [];
        items.forEach(item => {
            items_mod.push({ product_id: item.id, quantity: item.quantity });
        });
        axios.post(BASKET_URL, { orderedProducts: items_mod }).then(res => {
            const products = res.data;
            props.itemsCallback(products)
            setItemsAPI(products);
        })
        console.log(itemsAPI)
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div>
            {itemsAPI.products.map((item) => (
                <div key={item.id}>
                    <BasketItem2
                        id={item.id}
                        name={item.name}
                        rating={item.rating}
                        quantity={items.find((item2) => item.id === item2.id).quantity}
                        price={item.unitPrice}
                        //unitsInStock={item.unitsInStock}
                        imagePath={item.imagePath}
                    />
                </div>
            ))}
            <Card>
                <CardContent sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Box textAlign='center'>
                        <Typography sx={{ color: 'black', display: 'block', fontSize: 20 }}>
                            SUM: {itemsAPI.totalPrice} PLN
                        </Typography>

                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

export default BasketItems2
